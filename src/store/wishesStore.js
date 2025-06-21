'use client';

import { create } from 'zustand';
import { MessageService } from '@/lib/messages';

const useWishesStore = create((set, get) => ({
  wishes: [],
  loading: false,
  error: null,

  // Fetch all wishes (for admin)
  fetchWishes: async () => {
    set({ loading: true, error: null });
    try {
      const result = await MessageService.getAllMessages();
      if (result.success) {
        set({ wishes: result.data, loading: false });
      } else {
        set({ error: result.error, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Approve a wish
  approveWish: async (wishId) => {
    try {
      const result = await MessageService.approveMessage(wishId);
      if (result.success) {
        // Update the local state
        set((state) => ({
          wishes: state.wishes.map(wish =>
            wish.$id === wishId ? { ...wish, approved: true } : wish
          )
        }));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Delete a wish
  deleteWish: async (wishId) => {
    try {
      const result = await MessageService.deleteMessage(wishId);
      if (result.success) {
        // Remove from local state
        set((state) => ({
          wishes: state.wishes.filter(wish => wish.$id !== wishId)
        }));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Add a new wish (when submitted)
  addWish: (wish) => {
    set((state) => ({
      wishes: [wish, ...state.wishes]
    }));
  },
}));

export default useWishesStore;
