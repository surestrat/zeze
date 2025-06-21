'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { wishSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Send, Heart, Loader2, Mail, Sparkles, CheckCircle, User, MessageSquare } from 'lucide-react';

const WishForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(wishSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        form.reset();
        toast.success('Your birthday message has been sent! 🎉', {
          description: 'It will appear on the birthday page once approved.',
          duration: 5000,
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      toast.error('Failed to send your message', {
        description: 'Please try again in a moment.',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card className="glass-card-elevated border-0 overflow-hidden">
          <CardContent className="p-12 relative">
            {/* Success gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-400 to-teal-400 opacity-80" />
            <div className="absolute inset-0 bg-black/10" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <CheckCircle className="w-20 h-20 mx-auto text-white drop-shadow-lg" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 drop-shadow-lg">
                  Message Sent Successfully!
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Your beautiful birthday message has been received and will appear 
                  on the birthday page once it's approved. Thank you for spreading joy! 💕
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="lg"
                    className="glass-card border-white/30 text-white hover:bg-white/20 hover:border-white/50 btn-ripple"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Another Message
                  </Button>
                </motion.div>
              </div>

              {/* Floating success particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/40"
                    initial={{
                      x: '50%',
                      y: '50%',
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.random() - 0.5) * 60}%`,
                      y: `${30 + Math.random() * 40}%`,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-card-elevated border-0 overflow-hidden">
        <CardHeader className="text-center pb-8 relative">
          {/* Header gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-80" />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <Mail className="w-12 h-12 mx-auto text-white drop-shadow-lg" />
            </motion.div>
            
            <CardTitle className="text-3xl md:text-4xl font-display text-white drop-shadow-lg mb-4">
              Leave a Birthday Message
            </CardTitle>
            <p className="text-white/90 text-lg leading-relaxed">
              Share your birthday wishes and kind words. Your message will help make this day extra special! 🎉
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 font-semibold text-lg">
                      <User className="w-5 h-5 mr-2 text-purple-500" />
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          placeholder="Enter your beautiful name..."
                          {...field}
                          className="input-modern text-lg py-6 transition-smooth focus:ring-2 focus:ring-purple-400/50"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 font-semibold text-lg">
                      <MessageSquare className="w-5 h-5 mr-2 text-pink-500" />
                      Birthday Message
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Textarea
                          placeholder="Write your heartfelt birthday message here... Share what makes them special, your favorite memory together, or simply send warm wishes for their special day! 💕"
                          className="input-modern min-h-[150px] text-lg leading-relaxed transition-smooth focus:ring-2 focus:ring-pink-400/50 resize-none"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <div className="flex justify-between items-center mt-2">
                      <FormMessage className="text-red-500" />
                      <span className={`text-sm transition-colors ${
                        (field.value?.length || 0) > 200 
                          ? 'text-amber-500' 
                          : (field.value?.length || 0) > 240
                            ? 'text-red-500'
                            : 'text-gray-400'
                      }`}>
                        {field.value?.length || 0}/250
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full btn-gradient text-lg py-6 font-semibold btn-ripple group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Sending your wishes...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      Send Birthday Wishes
                      <Heart className="ml-3 h-5 w-5 fill-current group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="glass-card p-4 border-gradient">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Message Guidelines
                </span>
                <Sparkles className="w-4 h-4 text-pink-400 ml-2" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your message will be reviewed before appearing on the birthday page.
                Thank you for helping make this day special! ✨
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WishForm;
