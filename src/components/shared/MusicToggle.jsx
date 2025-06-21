'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';
import useStore from '@/store/countdownStore';

const MusicToggle = () => {
  const { musicEnabled, toggleMusic } = useStore();
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/music/birthday-ambience.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set a gentle volume
    audio.preload = 'auto';
    
    // Audio event listeners
    audio.oncanplaythrough = () => setIsLoaded(true);
    audio.onerror = () => setError(true);
    
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;

    if (musicEnabled) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio play failed:', error);
          setError(true);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [musicEnabled, isLoaded]);

  if (error || !isLoaded) {
    return null; // Hide the button if audio isn't available
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <Button
        onClick={toggleMusic}
        size="icon"
        variant={musicEnabled ? "default" : "outline"}
        className={`
          w-12 h-12 rounded-full shadow-lg transition-all duration-300
          ${musicEnabled 
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white' 
            : 'bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-purple-200 dark:border-purple-700'
          }
        `}
        aria-label={musicEnabled ? 'Mute background music' : 'Play background music'}
      >
        <motion.div
          animate={{ 
            rotate: musicEnabled ? [0, 5, -5, 0] : 0,
            scale: musicEnabled ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            duration: musicEnabled ? 2 : 0.3,
            repeat: musicEnabled ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {musicEnabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </motion.div>
        
        {/* Animated sound waves when playing */}
        {musicEnabled && (
          <div className="absolute -top-2 -right-2">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-pink-400 rounded-full"
            />
          </div>
        )}
      </Button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: musicEnabled ? 0 : 1, x: musicEnabled ? -10 : 0 }}
        transition={{ duration: 0.3, delay: 2 }}
        className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
      >
        Click for soft birthday music
        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-gray-800 dark:border-r-gray-700" />
      </motion.div>
    </motion.div>
  );
};

export default MusicToggle;
