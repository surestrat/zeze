'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Pause, 
  Play, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Settings,
  X
} from 'lucide-react';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    reduceMotion: false,
    reduceAnimations: false,
    highContrast: false,
    largerText: false,
    pauseAutoplay: false,
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSettings(prev => ({ ...prev, reduceMotion: true }));
    }
  }, []);

  useEffect(() => {
    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    // Apply settings to document
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
    document.documentElement.classList.toggle('reduce-animations', settings.reduceAnimations);
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.classList.toggle('larger-text', settings.largerText);
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Open accessibility options"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 right-6 -translate-y-1/2 z-50 w-80"
            >
              <Card className="glass-card-elevated border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Accessibility Options
                    </h2>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Reduce Motion */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Reduce Motion</span>
                      </div>
                      <Button
                        onClick={() => toggleSetting('reduceMotion')}
                        variant={settings.reduceMotion ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                      >
                        {settings.reduceMotion ? 'On' : 'Off'}
                      </Button>
                    </div>

                    {/* Reduce Animations */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Pause className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Reduce Animations</span>
                      </div>
                      <Button
                        onClick={() => toggleSetting('reduceAnimations')}
                        variant={settings.reduceAnimations ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                      >
                        {settings.reduceAnimations ? 'On' : 'Off'}
                      </Button>
                    </div>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gradient-to-r from-black to-white rounded-sm" />
                        <span className="text-sm font-medium">High Contrast</span>
                      </div>
                      <Button
                        onClick={() => toggleSetting('highContrast')}
                        variant={settings.highContrast ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                      >
                        {settings.highContrast ? 'On' : 'Off'}
                      </Button>
                    </div>

                    {/* Larger Text */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-green-500">A</span>
                        <span className="text-sm font-medium">Larger Text</span>
                      </div>
                      <Button
                        onClick={() => toggleSetting('largerText')}
                        variant={settings.largerText ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                      >
                        {settings.largerText ? 'On' : 'Off'}
                      </Button>
                    </div>

                    {/* Pause Autoplay */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Play className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Pause Autoplay</span>
                      </div>
                      <Button
                        onClick={() => toggleSetting('pauseAutoplay')}
                        variant={settings.pauseAutoplay ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                      >
                        {settings.pauseAutoplay ? 'On' : 'Off'}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      These settings are saved to your device and will persist across visits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;
