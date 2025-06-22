'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Gift, Heart, Sparkles, Timer, Zap, Send, Star, Cake } from 'lucide-react';
import useStore from '@/store/countdownStore';
import { useWindowDimensions, useReducedMotion } from '@/hooks/usePerformance';
import { CountdownSkeleton } from '@/components/ui/skeleton-enhanced';
import Link from 'next/link';

const Countdown = () => {
  const { targetDate, isUnlocked, unlockSite, forceUnlock } = useStore();
  const [timeLeft, setTimeLeft] = useState({});
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const prefersReducedMotion = useReducedMotion();

  // Motivational messages that rotate
  const motivationalMessages = [
    "✨ Something magical is brewing...",
    "🎂 The sweetest surprise awaits...",
    "💕 Love is being wrapped in this moment...",
    "🌟 Get ready for an unforgettable celebration...",
    "🎈 Joy is counting down with us...",
    "💫 Your special day approaches..."
  ];

  // Calculate initial date for progress (birthday announcement date)
  const initialDate = new Date('2025-06-01T00:00:00.000Z').getTime();

  useEffect(() => {
    setMounted(true);
    setLoading(false);
    // Debug logging
    console.log('Countdown mounted:', { targetDate, isUnlocked, currentTime: Date.now() });
  }, [targetDate, isUnlocked]);

  // Rotate motivational messages
  useEffect(() => {
    if (!mounted) return;
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 4000);
    return () => clearInterval(messageTimer);
  }, [mounted, motivationalMessages.length]);

  // Handle mouse movement for sparkles (performance optimized)
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || sparkles.length > 15) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (Math.random() > 0.85) { // Only create sparkles 15% of the time
      const newSparkle = {
        id: Date.now() + Math.random(),
        x,
        y,
        life: 100
      };
      setSparkles(prev => [...prev, newSparkle]);
    }
  }, [prefersReducedMotion, sparkles.length]);

  // Clean up sparkles
  useEffect(() => {
    if (!mounted) return;
    const sparkleTimer = setInterval(() => {
      setSparkles(prev => prev
        .map(sparkle => ({ ...sparkle, life: sparkle.life - 5 }))
        .filter(sparkle => sparkle.life > 0)
      );
    }, 50);
    return () => clearInterval(sparkleTimer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;
      const totalDuration = targetDate - initialDate;
      
      // Calculate progress percentage
      const progress = Math.max(0, Math.min(100, ((totalDuration - difference) / totalDuration) * 100));
      setProgressPercentage(progress);

      if (difference > 0) {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ weeks, days, hours, minutes, seconds });
      } else {
        setTimeLeft({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgressPercentage(100);
        unlockSite();
      }
    }, 1000);

    // Initial calculation
    const now = Date.now();
    const difference = targetDate - now;
    const totalDuration = targetDate - initialDate;
    const progress = Math.max(0, Math.min(100, ((totalDuration - difference) / totalDuration) * 100));
    setProgressPercentage(progress);
    
    if (difference > 0) {
      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ weeks, days, hours, minutes, seconds });
    }

    return () => clearInterval(timer);
  }, [targetDate, unlockSite, mounted, initialDate]);

  if (!mounted || loading) {
    return <CountdownSkeleton />;
  }

  if (isUnlocked) {
    return null; // Let the main content show
  }

  const timeUnits = [
    { 
      label: 'Weeks', 
      value: timeLeft.weeks || 0, 
      icon: Calendar,
      gradient: 'from-emerald-500 via-green-500 to-emerald-600',
      iconColor: 'text-emerald-100'
    },
    { 
      label: 'Days', 
      value: timeLeft.days || 0, 
      icon: Cake,
      gradient: 'from-pink-500 via-rose-500 to-pink-600',
      iconColor: 'text-pink-100'
    },
    { 
      label: 'Hours', 
      value: timeLeft.hours || 0, 
      icon: Clock,
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      iconColor: 'text-purple-100'
    },
    { 
      label: 'Minutes', 
      value: timeLeft.minutes || 0, 
      icon: Timer,
      gradient: 'from-indigo-500 via-blue-500 to-indigo-600',
      iconColor: 'text-indigo-100'
    },
    { 
      label: 'Seconds', 
      value: timeLeft.seconds || 0, 
      icon: Zap,
      gradient: 'from-cyan-500 via-teal-500 to-cyan-600',
      iconColor: 'text-cyan-100'
    },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center animated-bg relative overflow-hidden"
    >
      {/* Interactive Sparkles */}
      {!prefersReducedMotion && sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: sparkle.x - 5,
            top: sparkle.y - 5,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Star className="w-3 h-3 text-yellow-300" />
        </motion.div>
      ))}

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(prefersReducedMotion ? 5 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * windowWidth,
              y: Math.random() * windowHeight,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: prefersReducedMotion ? 5 : 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-12 p-8 relative z-10">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="glass-card p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm font-medium">Birthday Countdown Progress</span>
              <span className="text-white/90 text-sm font-bold">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="flex items-center justify-center mb-6">
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
              <Gift className="w-12 h-12 text-pink-300" />
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                delay: 0.5,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-10 h-10 text-yellow-300" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-display text-gradient-soft mb-6 text-shimmer">
            Something Magical Awaits
          </h1>
          
          {/* Rotating Motivational Messages */}
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <p className="text-2xl md:text-3xl text-white/90 font-medium">
              {motivationalMessages[currentMessageIndex]}
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto glass-card p-8">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              A birthday surprise crafted with love is being prepared just for you. 
              The magic will be revealed when the stars align on your special day...
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {timeUnits.map((unit, index) => {
            const IconComponent = unit.icon;
            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="glass-card-elevated card-hover border-0 overflow-hidden">
                  <CardContent className="p-8 relative">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${unit.gradient} opacity-80`} />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="mb-4"
                      >
                        <IconComponent className={`w-8 h-8 mx-auto ${unit.iconColor}`} />
                      </motion.div>
                      
                      <motion.div
                        key={unit.value}
                        initial={{ scale: 1.3, opacity: 0, rotateY: 90 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{ 
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="text-4xl md:text-5xl font-bold text-white mb-2 font-display"
                      >
                        {String(unit.value).padStart(2, '0')}
                      </motion.div>
                      
                      <div className="text-sm font-medium text-white/80 uppercase tracking-wider">
                        {unit.label}
                      </div>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          initial={{
                            x: '50%',
                            y: '100%',
                            opacity: 0,
                          }}
                          animate={{
                            y: ['100%', '0%'],
                            x: [
                              '50%', 
                              `${50 + (Math.random() - 0.5) * 40}%`,
                              '50%'
                            ],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="space-y-8"
        >
          <div className="glass-card p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-5xl"
              >
                🎂
              </motion.div>
              <Heart className="w-6 h-6 text-pink-400" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-4xl"
              >
                ✨
              </motion.div>
            </div>
            
            <p className="text-white/80 font-medium">
              {new Date(targetDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short'
              })}
            </p>
          </div>

          {/* Send Early Wish Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="space-y-4"
          >
            <div className="glass-card p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-pink-400 mr-2" />
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white/80 text-sm mb-4">
                Can&apos;t wait? Send your birthday wishes early!
              </p>
              <Link href="/wish">
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  size="lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Early Birthday Wish ✨
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Development/Testing button */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <Button 
                onClick={forceUnlock}
                variant="outline"
                size="sm"
                className="glass-card border-white/30 text-white hover:bg-white/10 btn-ripple"
              >
                <Zap className="mr-2 h-4 w-4" />
                Skip Countdown (Dev)
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced floating hearts animation */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(prefersReducedMotion ? 6 : 12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/60"
              initial={{
                x: Math.random() * windowWidth,
                y: windowHeight + 50,
                opacity: 0.8,
                scale: 0.5 + Math.random() * 0.5,
              }}
              animate={{
                y: -100,
                x: Math.random() * windowWidth,
                opacity: 0,
                rotate: prefersReducedMotion ? 0 : [0, 360],
              }}
              transition={{
                duration: prefersReducedMotion ? 8 : 6 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeOut",
              }}
              style={{
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {['💕', '💖', '✨', '🌟', '💫', '🎈', '🎂', '🎉'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>

        {/* Pulsing glow effect around the container */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Countdown;
