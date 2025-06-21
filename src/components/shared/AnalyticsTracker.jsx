'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useAnalyticsStore from '@/store/analyticsStore';

// Generate session ID
const generateSessionId = () => {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('birthday-session-id');
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem('birthday-session-id', sessionId);
  }
  return sessionId;
};

const AnalyticsTracker = () => {
  const pathname = usePathname();
  const { trackPageView, trackVisitor } = useAnalyticsStore();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') return;

    // Track visitor on first load
    const sessionId = generateSessionId();
    trackVisitor(sessionId);

    // Track page view
    let page = 'home';
    if (pathname.includes('/wish')) page = 'wish';
    else if (pathname.includes('/admin321')) page = 'admin';
    
    trackPageView(page);
  }, [pathname, trackPageView, trackVisitor]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;
