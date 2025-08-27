import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Bookmark,
  TrendUp,
  Calendar,
  ChartLine,
  Users
} from 'phosphor-react';
import { getPopularBlogs, getBookmarkedBlogs } from '@/data/blogAnalytics';
import { blogs } from '@/data/blogs';
import { cloudStorage } from '@/data/cloudStorage';

const BlogAnalyticsDashboard = () => {
  const [popularBlogIds, setPopularBlogIds] = useState<string[]>([]);
  const [bookmarkedBlogIds, setBookmarkedBlogIds] = useState<string[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalBookmarks, setTotalBookmarks] = useState(0);
  const [backupStatus, setBackupStatus] = useState({ lastBackup: 0, isOnline: true, hasLocalBackup: false });

  useEffect(() => {
    // Get popular blogs
    const popular = getPopularBlogs(5);
    setPopularBlogIds(popular);

    // Get bookmarked blogs for current session
    const bookmarked = getBookmarkedBlogs();
    setBookmarkedBlogIds(bookmarked);

    // Calculate total stats
    const viewCounts = JSON.parse(localStorage.getItem('blog_view_counts') || '{}');
    const totalViewsCount = Object.values(viewCounts).reduce((sum: number, count: unknown) => sum + (Number(count) || 0), 0) as number;
    setTotalViews(totalViewsCount);

    const bookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');
    setTotalBookmarks(bookmarks.length);

    // Get backup status
    const status = cloudStorage.getBackupStatus();
    setBackupStatus(status);
  }, []);

  const popularBlogs = popularBlogIds.map(id => blogs.find(b => b.id === id)).filter(Boolean);
  const bookmarkedBlogs = bookmarkedBlogIds.map(id => blogs.find(b => b.id === id)).filter(Boolean);

  const stats = [
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Total Bookmarks',
      value: totalBookmarks.toLocaleString(),
      icon: Bookmark,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
          {
        title: 'Popular Blogs',
        value: popularBlogIds.length.toString(),
        icon: TrendUp,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10'
      },
    {
      title: 'Your Bookmarks',
      value: bookmarkedBlogIds.length.toString(),
      icon: Users,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blog Analytics Dashboard
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real-time insights into your blog performance and reader engagement
          </p>

          {/* Backup Status */}
          <motion.div
            className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${backupStatus.isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-slate-300">
                  {backupStatus.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${backupStatus.hasLocalBackup ? 'bg-blue-400' : 'bg-yellow-400'}`}></div>
                <span className="text-slate-300">
                  {backupStatus.hasLocalBackup ? 'Local Backup' : 'No Local Backup'}
                </span>
              </div>
              {backupStatus.lastBackup > 0 && (
                <div className="text-slate-400">
                  Last backup: {new Date(backupStatus.lastBackup).toLocaleTimeString()}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`p-6 rounded-xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm ${stat.bgColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-800/50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Blogs */}
        {popularBlogs.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendUp className="w-6 h-6 text-green-400" />
              Most Popular Blogs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularBlogs.map((blog, index) => (
                <motion.div
                  key={blog?.id}
                  className="p-4 rounded-lg border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-green-400">#{index + 1}</span>
                    <span className="text-sm text-slate-400">
                      {blog?.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white mb-2 line-clamp-2">
                    {blog?.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {blog?.excerpt}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Your Bookmarks */}
        {bookmarkedBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-purple-400" />
              Your Saved Blogs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedBlogs.map((blog, index) => (
                <motion.div
                  key={blog?.id}
                  className="p-4 rounded-lg border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Bookmark className="w-5 h-5 text-purple-400 fill-current" />
                    <span className="text-sm text-slate-400">
                      {blog?.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white mb-2 line-clamp-2">
                    {blog?.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {blog?.excerpt}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Bookmarks Message */}
        {bookmarkedBlogs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Bookmark className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No saved blogs yet
            </h3>
            <p className="text-slate-500">
              Start reading and bookmark your favorite articles to see them here
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogAnalyticsDashboard;
