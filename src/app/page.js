'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/countdownStore';
import { useWindowDimensions, useReducedMotion } from '@/hooks/usePerformance';
import Countdown from '@/components/countdown/Countdown';
import BirthdayLetter from '@/components/birthday/BirthdayLetter';
import Compliments from '@/components/birthday/Compliments';
import WishesBoard from '@/components/birthday/WishesBoard';
import QuoteSection from '@/components/birthday/QuoteSection';
import MusicToggle from '@/components/shared/MusicToggle';
import ThemeToggle from '@/components/shared/ThemeToggle';
import AccessibilityPanel from '@/components/shared/AccessibilityPanel';
import { Button } from '@/components/ui/button';
import { Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { isUnlocked, checkUnlockStatus, targetDate } = useStore();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if we should unlock on page load
    console.log('🏠 Home component mounted, checking unlock status');
    console.log('🏠 Current state:', { 
      isUnlocked, 
      targetDate: new Date(targetDate).toISOString(),
      now: new Date().toISOString()
    });
    checkUnlockStatus();
  }, [checkUnlockStatus, isUnlocked, targetDate]);

  console.log('🏠 Home component render:', { isUnlocked });

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Countdown />
          </motion.div>
        ) : (
          <motion.div
            key="birthday-site"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
          >
            {/* Confetti Animation on Load */}
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(prefersReducedMotion ? 20 : 50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 opacity-80"
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: [
                      '#ff69b4', '#ff1493', '#ffd700', '#ff6347', 
                      '#98fb98', '#87ceeb', '#dda0dd', '#f0e68c'
                    ][Math.floor(Math.random() * 8)],
                  }}
                  initial={{
                    y: -100,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: windowHeight + 100,
                    rotate: prefersReducedMotion ? 180 : 360,
                    scale: [0, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 4 : 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Navigation Bar */}
            <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-100 dark:border-purple-800">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center space-x-2"
                  >
                    <Heart className="h-6 w-6 text-pink-500 fill-current" />
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Birthday ZeZe
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Link href="/wish">
                      <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 dark:border-pink-600 dark:text-pink-400">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Leave a Message
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main>
              {/* Birthday Letter Section */}
              <BirthdayLetter />

              {/* Compliments Carousel */}
              <Compliments />

              {/* Messages Wall */}
              <WishesBoard />

              {/* Inspirational Quotes */}
              <QuoteSection />

              {/* Footer */}
              <footer className="py-16 px-4 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-800 dark:via-purple-900/30 dark:to-indigo-900/30">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl mb-6">💜</div>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      Made with love, admiration, and countless hopes for your happiness.
                      <br />
                      You deserve all the wonderful things life has to offer.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Happy Birthday from someone who thinks you're absolutely amazing ✨
                    </p>
                  </motion.div>
                </div>
              </footer>
            </main>

            {/* Music Toggle */}
            <MusicToggle />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Accessibility Panel */}
            <AccessibilityPanel />

            {/* Floating Hearts Background Animation */}
            <div className="fixed inset-0 pointer-events-none z-10">
              {[...Array(prefersReducedMotion ? 3 : 6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-200 dark:text-pink-800"
                  initial={{
                    x: Math.random() * windowWidth,
                    y: windowHeight + 50,
                    opacity: 0.3,
                  }}
                  animate={{
                    y: -50,
                    opacity: 0,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 15 : 12 + Math.random() * 8,
                    repeat: Infinity,
                    delay: i * 3,
                    ease: "linear",
                  }}
                  style={{
                    fontSize: `${16 + Math.random() * 12}px`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  💕
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
