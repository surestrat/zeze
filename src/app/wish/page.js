'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WishForm from '@/components/forms/WishForm';
import { ArrowLeft, Heart } from 'lucide-react';
import { useWindowDimensions, useReducedMotion } from '@/hooks/usePerformance';
import Link from 'next/link';

export default function WishPage() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/10">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Birthday Site
          </Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-6">🎂</div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Share Birthday Wishes for Zizipho
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            You've been invited to share a special birthday message for Zizipho! Your words will help make her day unforgettable. 
            Write something heartfelt, funny, or inspiring – whatever comes from your heart. ✨
          </p>
        </motion.div>

        {/* Form section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WishForm />
        </motion.div>

        {/* Information section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Heart className="h-8 w-8 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                How it works
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p>📝 Write a heartfelt birthday message</p>
                <p>⏳ Your message will be reviewed before going live</p>
                <p>🎉 Once approved, it will appear on the birthday page</p>
                <p>💕 Help make this birthday extra special!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(prefersReducedMotion ? 4 : 8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              initial={{
                x: Math.random() * windowWidth,
                y: windowHeight + 50,
              }}
              animate={{
                y: -100,
                x: Math.random() * windowWidth,
              }}
              transition={{
                duration: prefersReducedMotion ? 10 : 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
            >
              {['🎈', '🎊', '🎉', '💝', '🌟', '💫', '✨', '🎂'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
