'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, RefreshCw, Sparkles, Clock, Users } from 'lucide-react';
import { MessageService } from '@/lib/messages';
import { MessagesSkeleton } from '@/components/ui/skeleton-enhanced';
import { useReducedMotion } from '@/hooks/usePerformance';

const WishesBoard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await MessageService.getApprovedMessages();
      if (result.success) {
        setMessages(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <MessagesSkeleton />;
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 mb-4">Error loading messages: {error}</p>
          <Button onClick={fetchMessages} variant="outline">
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-indigo-50/80 dark:from-gray-900/50 dark:via-purple-900/20 dark:to-indigo-900/30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(prefersReducedMotion ? 4 : 8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, 30, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: prefersReducedMotion ? 10 : 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-200/20 rounded-full px-6 py-2 mb-6"
          >
            <MessageCircle className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Messages Wall</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Birthday Messages
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Heartfelt wishes from friends and loved ones celebrating your special day
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mx-auto rounded-full"
          />
        </motion.div>

        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              💌
            </motion.div>
            <div className="glass-card bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Be the first to leave a birthday message!
              </p>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0"
                onClick={() => window.location.href = '/wish'}
              >
                <Heart className="mr-2 h-4 w-4" />
                Write First Message
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.$id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 glass-card bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 overflow-hidden group">
                      {/* Gradient border animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <CardContent className="p-6 h-full flex flex-col relative z-10">
                        {/* Message content */}
                        <div className="flex-1 mb-4">
                          <div className="flex items-start gap-3 mb-3">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                              className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full"
                            >
                              <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </motion.div>
                            <p className="text-gray-700 dark:text-gray-200 leading-relaxed flex-1">
                              "{message.message}"
                            </p>
                          </div>
                        </div>

                        {/* Author and date */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            >
                              <Heart className="h-4 w-4 text-pink-500 fill-current" />
                            </motion.div>
                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                              {message.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            {formatDate(message.timestamp)}
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-60 transition-all duration-300"
                        >
                          🎂
                        </motion.div>
                        
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: index * 0.2 
                          }}
                          className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity"
                        >
                          <Sparkles className="h-4 w-4 text-purple-400" />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Actions and Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-8">
                {/* Stats card */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-card bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[200px]"
                >
                  <div className="flex items-center gap-3 justify-center">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-full">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {messages.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {messages.length === 1 ? 'Message' : 'Messages'}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Refresh button */}
                <Button
                  onClick={fetchMessages}
                  className="glass-card bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 hover:bg-white/60 dark:hover:bg-gray-800/60 text-purple-600 dark:text-purple-400 transition-all duration-300"
                  variant="ghost"
                >
                  <motion.div
                    animate={loading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                  </motion.div>
                  Refresh Messages
                </Button>
              </div>

              {/* Love counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-center"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Messages of love and celebration
                </p>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(Math.min(messages.length, 5))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                    >
                      <Heart className="h-4 w-4 text-pink-400 fill-current" />
                    </motion.div>
                  ))}
                  {messages.length > 5 && (
                    <span className="text-pink-400 text-sm ml-1">+{messages.length - 5}</span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default WishesBoard;
