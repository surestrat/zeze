'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Sparkles, Gift, Crown, Feather } from 'lucide-react';

const BirthdayLetter = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-300/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Card className="glass-card-elevated border-0 overflow-hidden">
            <CardContent className="p-12 md:p-16 lg:p-20">
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-8">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mr-4"
                  >
                    <Crown className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                  
                  <h1 className="text-5xl md:text-7xl font-display text-gradient-soft text-shimmer">
                    Happy Birthday Zizipho!
                  </h1>
                  
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                    className="ml-4"
                  >
                    <Sparkles className="w-10 h-10 text-pink-400" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="w-32 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mx-auto rounded-full"
                />
              </motion.div>

              {/* Letter Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="space-y-8 text-center leading-relaxed"
              >
                {/* Opening */}
                <div className="glass-card p-8 border-gradient">
                  <div className="flex items-center justify-center mb-4">
                    <Feather className="w-6 h-6 text-purple-400 mr-3" />
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Feather className="w-6 h-6 text-purple-400 ml-3 scale-x-[-1]" />
                  </div>
                  <p className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-200 font-display">
                    Today marks another year of your beautiful journey through life, 
                    and I wanted to take a moment to celebrate the incredible person you are.
                  </p>
                </div>

                {/* Main content */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="glass-card p-6 card-hover"
                  >
                    <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Though we may not know each other deeply yet, I've noticed the warmth 
                      in your smile, the kindness in your eyes, and the genuine spirit you 
                      bring to every interaction. These qualities don't go unnoticed.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="glass-card p-6 card-hover"
                  >
                    <Gift className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      On this special day, I hope you're surrounded by love, laughter, 
                      and all the joy your heart can hold. You deserve to be celebrated 
                      not just today, but every day.
                    </p>
                  </motion.div>
                </div>

                {/* Centerpiece quote */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.3 }}
                  className="glass-card-elevated p-12 relative overflow-hidden"
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4">
                      <Star className="w-6 h-6" />
                    </div>
                    <div className="absolute top-8 right-8">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div className="absolute bottom-6 left-8">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-4 right-6">
                      <Star className="w-7 h-7" />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                      <span className="text-2xl md:text-3xl font-display text-gradient pulse-glow">
                        May this year bring you endless happiness
                      </span>
                      <motion.div
                        animate={{ rotate: [360, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-6 h-6 text-pink-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Closing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="glass-card p-8"
                >
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                    I hope this little surprise brought a smile to your face. 
                    You have a beautiful soul, and the world is brighter with you in it.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="text-right"
                  >
                    <p className="text-lg font-medium text-gradient-soft mb-2">
                      With warm wishes and admiration,
                    </p>
                    <div className="flex items-center justify-end space-x-2">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Heart className="w-8 h-8 text-pink-500 fill-current" />
                      </motion.div>
                      <span className="text-3xl font-display text-gradient">Someone who admires you</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex justify-center mt-12 space-x-8"
        >
          {[
            { icon: Gift, color: 'text-pink-400', delay: 0 },
            { icon: Heart, color: 'text-red-400', delay: 0.3 },
            { icon: Star, color: 'text-yellow-400', delay: 0.6 },
            { icon: Sparkles, color: 'text-purple-400', delay: 0.9 }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
                className="float"
              >
                <IconComponent className={`w-8 h-8 ${item.color}`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0,
              }}
              animate={{
                y: [null, '-100px', null],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            >
              <Star className="w-3 h-3 text-yellow-300/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BirthdayLetter;
