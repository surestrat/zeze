'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { account } from '@/lib/appwrite';

const useAdminStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      loginAttempts: 0,
      lastLoginAttempt: null,
      sessionExpiry: null,

      // Admin login with Appwrite
      login: async (email, password) => {
        const { loginAttempts, lastLoginAttempt } = get();
        const now = Date.now();
        
        // Rate limiting: max 5 attempts per hour
        if (loginAttempts >= 5 && lastLoginAttempt && (now - lastLoginAttempt) < 3600000) {
          throw new Error('Too many login attempts. Please try again in 1 hour.');
        }

        try {
          // First, check if there's an existing session
          try {
            await account.deleteSession('current');
          } catch (e) {
            // No existing session, continue
          }

          // Create new session with Appwrite
          const session = await account.createEmailPasswordSession(email, password);
          
          // Get user details
          const user = await account.get();
          
          const sessionExpiry = now + (24 * 60 * 60 * 1000); // 24 hours
          
          set({
            isAuthenticated: true,
            user: user,
            loginAttempts: 0,
            sessionExpiry,
          });

          return { success: true, user };
        } catch (error) {
          set({
            loginAttempts: loginAttempts + 1,
            lastLoginAttempt: now,
          });
          
          console.error('Login error:', error);
          throw new Error(error.message || 'Invalid email or password');
        }
      },

      // Admin logout
      logout: async () => {
        try {
          await account.deleteSession('current');
        } catch (error) {
          console.error('Logout error:', error);
        }
        
        set({
          isAuthenticated: false,
          user: null,
          sessionExpiry: null,
        });
      },

      // Check if session is valid
      checkSession: async () => {
        const { isAuthenticated, sessionExpiry } = get();
        
        // Check if session expired
        if (isAuthenticated && sessionExpiry && Date.now() > sessionExpiry) {
          await get().logout();
          return false;
        }

        // Check with Appwrite
        try {
          const user = await account.get();
          if (user) {
            set({ 
              isAuthenticated: true, 
              user: user,
              sessionExpiry: Date.now() + (24 * 60 * 60 * 1000), // Extend session
            });
            return true;
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            sessionExpiry: null,
          });
          return false;
        }

        return isAuthenticated;
      },

      // Extend session
      extendSession: () => {
        const { isAuthenticated } = get();
        if (isAuthenticated) {
          set({
            sessionExpiry: Date.now() + (24 * 60 * 60 * 1000), // Extend by 24 hours
          });
        }
      },
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        sessionExpiry: state.sessionExpiry,
        loginAttempts: state.loginAttempts,
        lastLoginAttempt: state.lastLoginAttempt,
      }),
    }
  )
);

export default useAdminStore;
