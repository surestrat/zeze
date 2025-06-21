'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Safe window dimensions hook that prevents hydration mismatch
 */
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1200, // Default fallback
    height: 800,
  });

  useEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return { width, height };
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    // Set initial dimensions
    setWindowDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

/**
 * Optimized animation hook with cleanup
 */
export function useAnimationCleanup() {
  const animationRefs = useRef(new Set());

  const registerAnimation = useCallback((id) => {
    animationRefs.current.add(id);
  }, []);

  const unregisterAnimation = useCallback((id) => {
    animationRefs.current.delete(id);
  }, []);

  useEffect(() => {
    // Cleanup all animations on unmount
    const currentAnimations = animationRefs.current;
    return () => {
      currentAnimations.clear();
    };
  }, []);

  return { registerAnimation, unregisterAnimation };
}

/**
 * Debounced value hook for performance
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Intersection observer hook for performance-optimized animations
 */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
}

/**
 * Reduced motion hook for accessibility
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Performance monitoring hook
 */
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    function measureFPS() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const memory = (performance).memory?.usedJSHeapSize || 0;
        
        setMetrics({ fps, memory });
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    }

    const rafId = requestAnimationFrame(measureFPS);
    
    return () => cancelAnimationFrame(rafId);
  }, []);

  return metrics;
}
