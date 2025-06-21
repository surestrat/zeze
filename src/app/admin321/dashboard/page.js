'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  LogOut, 
  Calendar, 
  MessageSquare, 
  Users, 
  Activity,
  Clock,
  Heart,
  Trash2,
  Check,
  X,
  BarChart3,
  Eye,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import useAdminStore from '@/store/adminStore';
import useCountdownStore from '@/store/countdownStore';
import useWishesStore from '@/store/wishesStore';
import useAnalyticsStore from '@/store/analyticsStore';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [newCountdownDate, setNewCountdownDate] = useState('');
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalWishes: 0,
    pendingWishes: 0,
    approvedWishes: 0
  });

  const { logout, checkSession, isAuthenticated, user } = useAdminStore();
  const { targetDate, setTargetDate } = useCountdownStore();
  const { wishes, fetchWishes, approveWish, deleteWish } = useWishesStore();
  const { getAnalytics, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkSession();
      if (!isAuth) {
        router.push('/admin321');
        return;
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [checkSession, router]);

  const loadDashboardData = useCallback(async () => {
    try {
      await Promise.all([
        fetchWishes(),
        fetchAnalytics()
      ]);
      
      // Get current analytics
      const analytics = getAnalytics();
      
      // Calculate stats
      const pendingCount = wishes.filter(w => !w.approved).length;
      const approvedCount = wishes.filter(w => w.approved).length;
      
      setStats({
        totalVisitors: analytics.uniqueVisitors || 0,
        totalWishes: wishes.length,
        pendingWishes: pendingCount,
        approvedWishes: approvedCount
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }, [wishes, fetchWishes, fetchAnalytics, getAnalytics]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, loadDashboardData]);

  const handleLogout = async () => {
    await logout();
    router.push('/admin321');
  };

  const handleUpdateCountdown = async () => {
    if (!newCountdownDate) return;
    
    try {
      const newDate = new Date(newCountdownDate);
      setTargetDate(newDate);
      setNewCountdownDate('');
      toast.success('Countdown date updated successfully! 🎉', {
        description: `New target date: ${newDate.toLocaleString()}`,
      });
    } catch (error) {
      console.error('Error updating countdown:', error);
      toast.error('Failed to update countdown date', {
        description: 'Please check the date format and try again.',
      });
    }
  };

  const handleWishAction = async (wishId, action) => {
    try {
      if (action === 'approve') {
        await approveWish(wishId);
        toast.success('Birthday message approved! ✅', {
          description: 'Zizipho will love reading this special message!',
        });
      } else if (action === 'delete') {
        await deleteWish(wishId);
        toast.success('Message deleted', {
          description: 'The message has been permanently removed.',
        });
      }
      await loadDashboardData(); // Refresh data
    } catch (error) {
      console.error(`Error ${action}ing wish:`, error);
      toast.error(`Failed to ${action} message`, {
        description: 'Please try again in a moment.',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
        />
      </div>
    );
  }

  const pendingWishes = wishes.filter(w => !w.approved);
  const approvedWishes = wishes.filter(w => w.approved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Zizipho&apos;s Birthday Admin</h1>
                  <p className="text-gray-300">Managing Zizipho&apos;s special celebration ✨</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Site Visitors</p>
                <p className="text-2xl font-bold text-white">{stats.totalVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Birthday Wishes</p>
                <p className="text-2xl font-bold text-white">{stats.totalWishes}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pendingWishes}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Published</p>
                <p className="text-2xl font-bold text-purple-400">{stats.approvedWishes}</p>
              </div>
              <Heart className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="wishes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black/30 border border-white/10">
            <TabsTrigger value="wishes" className="data-[state=active]:bg-purple-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Birthday Messages
            </TabsTrigger>
            <TabsTrigger value="countdown" className="data-[state=active]:bg-purple-600">
              <Calendar className="w-4 h-4 mr-2" />
              Countdown Settings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Site Analytics
            </TabsTrigger>
          </TabsList>

          {/* Wishes Management */}
          <TabsContent value="wishes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Wishes */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    Pending Messages ({pendingWishes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {pendingWishes.map((wish) => (
                      <motion.div
                        key={wish.$id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass-card p-4 border border-yellow-500/30"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-white">{wish.name}</span>
                            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                              Pending
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm">{wish.message}</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleWishAction(wish.$id, 'approve')}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve for Zizipho
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWishAction(wish.$id, 'delete')}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {pendingWishes.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No pending messages for Zizipho</p>
                  )}
                </CardContent>
              </Card>

              {/* Approved Wishes */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-green-400" />
                    Published Messages ({approvedWishes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {approvedWishes.map((wish) => (
                    <div
                      key={wish.$id}
                      className="glass-card p-4 border border-green-500/30"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{wish.name}</span>
                          <Badge className="bg-green-600 text-white">
                            Live on Site
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm">{wish.message}</p>
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleWishAction(wish.$id, 'delete')}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {approvedWishes.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No published messages yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Countdown Settings */}
          <TabsContent value="countdown">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Zizipho&apos;s Birthday Countdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Current Target Date</Label>
                      <div className="mt-2 p-3 bg-black/30 rounded-lg border border-white/10">
                        <p className="text-white font-mono">
                          {targetDate ? new Date(targetDate).toLocaleString() : 'Not set'}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="countdown-date" className="text-gray-300">
                        New Target Date & Time
                      </Label>
                      <Input
                        id="countdown-date"
                        type="datetime-local"
                        value={newCountdownDate}
                        onChange={(e) => setNewCountdownDate(e.target.value)}
                        className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-purple-400"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    
                    <Button
                      onClick={handleUpdateCountdown}
                      disabled={!newCountdownDate}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Update Birthday Date
                    </Button>
                  </div>

                  <div className="glass-card p-4 border border-purple-500/30">
                    <h3 className="text-white font-semibold mb-3">Time Until Zizipho&apos;s Birthday</h3>
                    <div className="space-y-2 text-center">
                      {targetDate && (
                        <>
                          {(() => {
                            const now = new Date();
                            const target = new Date(targetDate);
                            const timeDiff = target - now;
                            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                            
                            if (timeDiff <= 0) {
                              return (
                                <>
                                  <p className="text-2xl font-bold text-green-400">🎉</p>
                                  <p className="text-green-400 text-sm">It&apos;s Zizipho&apos;s Birthday!</p>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <p className="text-2xl font-bold text-purple-400">{days} days</p>
                                  <p className="text-gray-400 text-sm">until the special celebration</p>
                                </>
                              );
                            }
                          })()}
                        </>
                      )}
                      {!targetDate && (
                        <p className="text-gray-400 text-sm">No target date set</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Zizipho&apos;s Birthday Site Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-4 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Total Page Views</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">
                      {(() => {
                        const analytics = getAnalytics();
                        return analytics?.totalPageViews || 0;
                      })()}
                    </p>
                  </div>

                  <div className="glass-card p-4 border border-green-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Unique Visitors</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                      {(() => {
                        const analytics = getAnalytics();
                        return analytics?.uniqueVisitors || 0;
                      })()}
                    </p>
                  </div>

                  <div className="glass-card p-4 border border-purple-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Activity className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">Message Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-400">
                      {(() => {
                        const analytics = getAnalytics();
                        return analytics?.engagementRate || 0;
                      })()}%
                    </p>
                  </div>
                </div>

                {/* Page Views Breakdown */}
                <div className="mt-6">
                  <h3 className="text-white font-semibold mb-4">Page Views Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(() => {
                      const analytics = getAnalytics();
                      const pageViews = analytics?.pageViews || {};
                      return Object.entries(pageViews).map(([page, views]) => (
                        <div key={page} className="glass-card p-3 border border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 capitalize">
                              {page === 'admin' ? 'Admin Panel' : 
                               page === 'home' ? 'Main Birthday Page' :
                               page === 'wish' ? 'Message Form' : 
                               `${page} Page`}
                            </span>
                            <span className="text-white font-bold">{views}</span>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={loadDashboardData}
                    variant="outline"
                    className="border-white/20 text-gray-300 hover:bg-white/10"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
