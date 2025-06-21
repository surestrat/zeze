import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Countdown state
      isUnlocked: false,
      targetDate: new Date(process.env.NEXT_PUBLIC_TARGET_DATE || '2025-06-26T00:00:00').getTime(),
      
      // Theme state
      musicEnabled: process.env.NEXT_PUBLIC_MUSIC_ENABLED === 'true' || false,
      
      // Actions
      unlockSite: () => set({ isUnlocked: true }),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      
      // Set new target date (for admin)
      setTargetDate: (newDate) => {
        const timestamp = newDate instanceof Date ? newDate.getTime() : new Date(newDate).getTime();
        set({ targetDate: timestamp });
        // Check if we should unlock based on new date
        if (Date.now() >= timestamp) {
          set({ isUnlocked: true });
        } else {
          set({ isUnlocked: false });
        }
      },
      
      // Check if countdown should be unlocked (for development/testing)
      checkUnlockStatus: () => {
        const now = Date.now();
        const { targetDate, isUnlocked } = get();
        console.log('🔍 Debug checkUnlockStatus:', {
          now: new Date(now).toISOString(),
          targetDate: new Date(targetDate).toISOString(),
          currentlyUnlocked: isUnlocked,
          shouldUnlock: now >= targetDate
        });
        if (now >= targetDate) {
          console.log('🔓 Unlocking site - target date reached');
          set({ isUnlocked: true });
        } else {
          console.log('🔒 Keeping site locked - target date not reached');
          // Don't change unlock status if target date hasn't been reached
        }
      },
      
      // Force unlock for testing (remove in production)
      forceUnlock: () => set({ isUnlocked: true }),
      
      // Reset to locked state (for debugging)
      resetState: () => {
        console.log('🔄 Resetting countdown state');
        const now = Date.now();
        const currentTargetDate = get().targetDate;
        set({ 
          isUnlocked: now >= currentTargetDate,
          targetDate: currentTargetDate
        });
      },
    }),
    {
      name: 'birthday-site-storage',
      partialize: (state) => ({
        isUnlocked: state.isUnlocked,
        musicEnabled: state.musicEnabled,
        targetDate: state.targetDate,
      }),
    }
  )
);

export default useStore;
