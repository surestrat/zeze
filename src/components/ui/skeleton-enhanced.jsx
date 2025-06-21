'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const SkeletonCard = ({ className = "", children }) => (
  <Card className={`glass-card border-0 overflow-hidden ${className}`}>
    <CardContent className="p-6">
      {children}
    </CardContent>
  </Card>
);

const SkeletonLine = ({ width = "100%", height = "1rem", className = "" }) => (
  <motion.div
    className={`bg-gray-300/50 dark:bg-gray-700/50 rounded-md ${className}`}
    style={{ width, height }}
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const SkeletonCircle = ({ size = "3rem", className = "" }) => (
  <motion.div
    className={`bg-gray-300/50 dark:bg-gray-700/50 rounded-full ${className}`}
    style={{ width: size, height: size }}
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const MessagesSkeleton = () => (
  <section className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <SkeletonLine width="200px" height="2rem" className="mx-auto mb-4" />
        <SkeletonLine width="300px" height="1rem" className="mx-auto mb-6" />
        <SkeletonLine width="96px" height="4px" className="mx-auto" />
      </div>

      {/* Messages grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <SkeletonCard className="h-48">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <SkeletonCircle size="2rem" />
                  <div className="flex-1 space-y-2">
                    <SkeletonLine width="100%" height="1rem" />
                    <SkeletonLine width="80%" height="1rem" />
                    <SkeletonLine width="60%" height="1rem" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <SkeletonCircle size="1rem" />
                    <SkeletonLine width="80px" height="1rem" />
                  </div>
                  <SkeletonLine width="60px" height="0.8rem" />
                </div>
              </div>
            </SkeletonCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const ComplimentsSkeleton = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <SkeletonLine width="300px" height="3rem" className="mx-auto mb-4" />
        <SkeletonLine width="400px" height="1.5rem" className="mx-auto" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <SkeletonCard className="h-80 md:h-96">
          <div className="h-full flex flex-col items-center justify-center space-y-6">
            <SkeletonCircle size="5rem" />
            <div className="text-center space-y-3 w-full">
              <SkeletonLine width="80%" height="2rem" className="mx-auto" />
              <SkeletonLine width="60%" height="2rem" className="mx-auto" />
            </div>
          </div>
        </SkeletonCard>

        {/* Navigation skeleton */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
          <SkeletonCircle size="3rem" />
          <SkeletonCircle size="3rem" />
        </div>

        {/* Dots skeleton */}
        <div className="flex justify-center mt-12 space-x-3">
          {[...Array(8)].map((_, i) => (
            <SkeletonCircle key={i} size="1rem" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const CountdownSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
    <div className="text-center space-y-12 p-8 relative z-10">
      {/* Header skeleton */}
      <div className="space-y-6 pt-20">
        <SkeletonLine width="400px" height="4rem" className="mx-auto" />
        <SkeletonCard className="max-w-3xl mx-auto">
          <div className="p-8 space-y-4">
            <SkeletonLine width="100%" height="1.5rem" />
            <SkeletonLine width="80%" height="1.5rem" />
          </div>
        </SkeletonCard>
      </div>

      {/* Countdown grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <SkeletonCard className="h-40">
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <SkeletonCircle size="2rem" />
                <SkeletonLine width="3rem" height="3rem" />
                <SkeletonLine width="4rem" height="1rem" />
              </div>
            </SkeletonCard>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default {
  Messages: MessagesSkeleton,
  Compliments: ComplimentsSkeleton,
  Countdown: CountdownSkeleton,
  Line: SkeletonLine,
  Circle: SkeletonCircle,
  Card: SkeletonCard,
};
