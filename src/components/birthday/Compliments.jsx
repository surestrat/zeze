'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star, Sun, Moon, Flower2, Zap, Crown } from 'lucide-react';
import { ComplimentsSkeleton } from '@/components/ui/skeleton-enhanced';
import { useReducedMotion } from '@/hooks/usePerformance';

const compliments = [
  {
    text: "You radiate warmth wherever you go",
    icon: Sun,
    gradient: "from-orange-400 via-pink-400 to-red-400",
    particleColor: "text-orange-200"
  },
  {
    text: "Your smile lights up the room",
    icon: Sparkles,
    gradient: "from-yellow-400 via-amber-400 to-orange-400",
    particleColor: "text-yellow-200"
  },
  {
    text: "You have a beautiful, kind heart",
    icon: Heart,
    gradient: "from-pink-400 via-rose-400 to-red-400",
    particleColor: "text-pink-200"
  },
  {
    text: "You deserve all the happiness in the world",
    icon: Star,
    gradient: "from-purple-400 via-violet-400 to-indigo-400",
    particleColor: "text-purple-200"
  },
  {
    text: "Your presence makes everything better",
    icon: Crown,
    gradient: "from-blue-400 via-indigo-400 to-purple-400",
    particleColor: "text-blue-200"
  },
  {
    text: "You inspire others with your grace",
    icon: Flower2,
    gradient: "from-teal-400 via-cyan-400 to-blue-400",
    particleColor: "text-teal-200"
  },
  {
    text: "You are absolutely wonderful just as you are",
    icon: Zap,
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
    particleColor: "text-indigo-200"
  },
  {
    text: "The world is more beautiful with you in it",
    icon: Moon,
    gradient: "from-pink-400 via-purple-400 to-indigo-400",
    particleColor: "text-pink-200"
  }
];

const Compliments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % compliments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, prefersReducedMotion]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % compliments.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + compliments.length) % compliments.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!mounted) {
    return <ComplimentsSkeleton />;
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-yellow-400 mr-4" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display text-gradient-soft">
              A Few Things About You
            </h2>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-pink-400 ml-4" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sometimes we need to be reminded of how special we are ✨
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main carousel card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-80 md:h-96"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: 90, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, rotateY: -90, scale: 0.8 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100
                }}
                className="absolute inset-0"
              >
                <Card className="h-full glass-card-elevated border-0 overflow-hidden card-hover">
                  <CardContent className={`h-full flex flex-col items-center justify-center p-12 bg-gradient-to-br ${compliments[currentIndex].gradient} relative`}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Content */}
                    <div className="relative z-20 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="mb-8"
                      >
                        {React.createElement(compliments[currentIndex].icon, {
                          className: "w-16 h-16 md:w-20 md:h-20 mx-auto text-white drop-shadow-lg"
                        })}
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-2xl md:text-4xl font-display font-bold text-white leading-relaxed drop-shadow-lg"
                      >
                        {compliments[currentIndex].text}
                      </motion.h3>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(prefersReducedMotion ? 4 : 8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 ${compliments[currentIndex].particleColor} rounded-full opacity-60`}
                          initial={{
                            x: `${20 + (i * 10)}%`,
                            y: "100%",
                            scale: 0,
                          }}
                          animate={{
                            y: ["100%", prefersReducedMotion ? "50%" : "-20%"],
                            x: [
                              `${20 + (i * 10)}%`,
                              `${20 + (i * 10) + (prefersReducedMotion ? 10 : Math.random() - 0.5) * 30}%`,
                            ],
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                          }}
                          transition={{
                            duration: prefersReducedMotion ? 4 : 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-6 left-6 opacity-30">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-6 right-6 opacity-30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-6 left-6 opacity-30">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-6 right-6 opacity-30">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-30">
            <Button
              onClick={() => {
                goToPrev();
                setAutoPlay(false);
              }}
              variant="outline"
              size="icon"
              className="pointer-events-auto glass-card border-white/30 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => {
                goToNext();
                setAutoPlay(false);
              }}
              variant="outline"
              size="icon"
              className="pointer-events-auto glass-card border-white/30 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Enhanced dots indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {compliments.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                goToSlide(index);
                setAutoPlay(false);
              }}
              className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'w-12 h-4 bg-gradient-to-r from-pink-400 to-purple-500'
                  : 'w-4 h-4 bg-white/40 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Auto-play control */}
        <div className="text-center mt-8">
          <Button
            onClick={() => setAutoPlay(!autoPlay)}
            variant="ghost"
            size="sm"
            className="glass-card text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border-gray-300/30"
          >
            {autoPlay ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Zap className="h-4 w-4" />
                </motion.div>
                Auto-play Active
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Resume Auto-play
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Compliments;
