'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-red-900/10 dark:to-purple-900/10 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg w-full"
          >
            <Card className="glass-card border-0 overflow-hidden">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-6"
                >
                  <AlertTriangle className="w-16 h-16 mx-auto text-red-500" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {process.env.NODE_ENV === 'development' && this.state.error
                      ? this.state.error.toString()
                      : "Don't worry, it's not your fault. Let's get you back to the birthday celebration!"
                    }
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={this.handleReset}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>

                    <Button
                      onClick={this.handleRefresh}
                      variant="outline"
                      className="w-full"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Refresh Page
                    </Button>
                  </div>
                </motion.div>

                {/* Development error details */}
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <motion.details
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-6 text-left"
                  >
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Error Details (Dev Mode)
                    </summary>
                    <pre className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </motion.details>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
