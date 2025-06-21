'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      visits: 0,
      uniqueVisitors: new Set(),
      pageViews: {
        home: 0,
        wish: 0,
        admin: 0,
      },
      messagesSubmitted: 0,
      lastVisit: null,
      dailyStats: {},

      // Track page visit
      trackPageView: (page) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          pageViews: {
            ...state.pageViews,
            [page]: (state.pageViews[page] || 0) + 1,
          },
          dailyStats: {
            ...state.dailyStats,
            [today]: {
              ...state.dailyStats[today],
              [page]: (state.dailyStats[today]?.[page] || 0) + 1,
              total: (state.dailyStats[today]?.total || 0) + 1,
            },
          },
        }));
      },

      // Track unique visitor
      trackVisitor: (sessionId) => {
        const { uniqueVisitors } = get();
        if (!uniqueVisitors.has(sessionId)) {
          set((state) => ({
            visits: state.visits + 1,
            uniqueVisitors: new Set([...state.uniqueVisitors, sessionId]),
            lastVisit: new Date().toISOString(),
          }));
        }
      },

      // Track message submission
      trackMessageSubmission: () => {
        set((state) => ({
          messagesSubmitted: state.messagesSubmitted + 1,
        }));
      },

      // Get analytics summary
      getAnalytics: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const todayStats = state.dailyStats[today] || {};

        return {
          totalVisits: state.visits,
          uniqueVisitors: state.uniqueVisitors.size,
          pageViews: state.pageViews,
          totalPageViews: Object.values(state.pageViews).reduce((sum, count) => sum + count, 0),
          messagesSubmitted: state.messagesSubmitted,
          todayViews: todayStats.total || 0,
          lastVisit: state.lastVisit,
          dailyStats: state.dailyStats,
          engagementRate: state.visits > 0 ? Math.round((state.messagesSubmitted / state.visits) * 100) : 0,
        };
      },

      // Fetch analytics (for admin dashboard compatibility)
      fetchAnalytics: async () => {
        // This is a local store, so we just return the current analytics
        return Promise.resolve();
      },

      // Reset analytics (admin only)
      resetAnalytics: () => {
        set({
          visits: 0,
          uniqueVisitors: new Set(),
          pageViews: { home: 0, wish: 0, admin: 0 },
          messagesSubmitted: 0,
          lastVisit: null,
          dailyStats: {},
        });
      },
    }),
    {
      name: 'birthday-analytics',
      partialize: (state) => ({
        visits: state.visits,
        uniqueVisitors: Array.from(state.uniqueVisitors), // Convert Set to Array for persistence
        pageViews: state.pageViews,
        messagesSubmitted: state.messagesSubmitted,
        lastVisit: state.lastVisit,
        dailyStats: state.dailyStats,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.uniqueVisitors)) {
          // Convert Array back to Set after rehydration
          state.uniqueVisitors = new Set(state.uniqueVisitors);
        }
      },
    }
  )
);

export default useAnalyticsStore;
