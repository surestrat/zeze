'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Sparkles, Heart, Star } from 'lucide-react';

const quotes = [
  {
    text: "Count your life by smiles, not tears. Count your age by friends, not years.",
    author: "John Lennon",
    color: "from-pink-400 to-rose-400"
  },
  {
    text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
    author: "Oprah Winfrey",
    color: "from-purple-400 to-pink-400"
  },
  {
    text: "A birthday is just another day where you go to work and people give you love. Age is just a state of mind, and you are as old as you think you are.",
    author: "Abhishek Bachchan",
    color: "from-indigo-400 to-purple-400"
  },
  {
    text: "Today you are you! That is truer than true! There is no one alive who is you-er than you!",
    author: "Dr. Seuss",
    color: "from-blue-400 to-indigo-400"
  }
];

const QuoteSection = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-indigo-50/80 dark:from-gray-900/50 dark:via-purple-900/20 dark:to-indigo-900/30" />
      
      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-3 h-3 text-purple-300/60" fill="currentColor" />
          </motion.div>
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/20 rounded-full px-6 py-2 mb-6"
          >
            <Quote className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Inspirational Quotes</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Words of Inspiration
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beautiful thoughts and wisdom to inspire joy on your special day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 glass-card bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 overflow-hidden group">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${quote.color}`} />
                
                <CardContent className="p-8 h-full flex flex-col relative">
                  {/* Quote icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="absolute top-6 left-6 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full opacity-60 group-hover:opacity-80 transition-opacity"
                  >
                    <Quote className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </motion.div>

                  <div className="flex-1 flex flex-col justify-center mt-8">
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 italic font-light text-center relative"
                    >
                      <span className="relative z-10">"{quote.text}"</span>
                      {/* Decorative quotes */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5 
                        }}
                        className="absolute -top-4 -left-4 text-6xl opacity-20 text-purple-300"
                      >
                        "
                      </motion.div>
                    </motion.blockquote>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-4" />
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-pink-400 fill-current" />
                        <cite className={`text-sm font-semibold bg-gradient-to-r ${quote.color} bg-clip-text text-transparent not-italic`}>
                          {quote.author}
                        </cite>
                        <Heart className="h-4 w-4 text-pink-400 fill-current" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced decorative sparkle */}
                  <motion.div
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                    className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-60 transition-opacity"
                  >
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  
                  {/* Additional floating element */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="absolute top-4 right-4 text-lg opacity-20 group-hover:opacity-40 transition-opacity"
                  >
                    ✨
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="relative mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-4 text-4xl"
          >
            <motion.span
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: 0
              }}
            >
              🌟
            </motion.span>
            <motion.span
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: 0.5
              }}
            >
              💫
            </motion.span>
            <motion.span
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: 1
              }}
            >
              ✨
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
