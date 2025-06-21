'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed top-6 right-6 z-50"
    >
      <Button
        onClick={toggleTheme}
        size="icon"
        variant="outline"
        className={`
          w-12 h-12 rounded-full shadow-lg transition-all duration-500 glass-card
          ${theme === 'dark' 
            ? 'bg-gray-800/90 border-gray-600/50 hover:bg-gray-700/90' 
            : 'bg-white/90 border-gray-200/50 hover:bg-gray-50/90'
          }
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <motion.div
          animate={{ 
            rotate: theme === 'dark' ? 360 : 0,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 0.6, ease: "easeInOut" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          {theme === 'dark' ? (
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <Moon className="h-5 w-5 text-blue-400" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <Sun className="h-5 w-5 text-yellow-500" />
            </motion.div>
          )}
        </motion.div>
        
        {/* Sparkle effect on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-1 -right-1"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-3 w-3 text-purple-400" />
          </motion.div>
        </motion.div>
      </Button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
      >
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-gray-800 dark:border-l-gray-700" />
      </motion.div>
    </motion.div>
  );
};

export default ThemeToggle;
