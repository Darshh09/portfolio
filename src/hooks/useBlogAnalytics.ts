import { useState, useEffect, useCallback } from 'react';
import {
  trackBlogView,
  getBlogStats,
  toggleBookmark,
  isBookmarked,
  BlogStats
} from '@/data/blogAnalytics';

export const useBlogAnalytics = (blogId: string) => {
  const [stats, setStats] = useState<BlogStats>({
    blogId,
    totalViews: 0,
    uniqueViews: 0,
    bookmarks: 0,
    lastViewed: 0
  });
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  // Update stats
  const updateStats = useCallback(() => {
    const currentStats = getBlogStats(blogId);
    setStats(currentStats);
  }, [blogId]);

  // Track view
  const trackView = useCallback(() => {
    trackBlogView(blogId);
    updateStats();
  }, [blogId, updateStats]);

  // Toggle bookmark
  const toggleBookmarkState = useCallback(() => {
    const wasAdded = toggleBookmark(blogId);
    setIsBookmarkedState(wasAdded);
    updateStats();
    return wasAdded;
  }, [blogId, updateStats]);

  // Check bookmark status
  const checkBookmarkStatus = useCallback(() => {
    setIsBookmarkedState(isBookmarked(blogId));
  }, [blogId]);

  // Initialize
  useEffect(() => {
    updateStats();
    checkBookmarkStatus();
  }, [blogId, updateStats, checkBookmarkStatus]);

  // Auto-update stats every 30 seconds for real-time feel
  useEffect(() => {
    const interval = setInterval(() => {
      updateStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [updateStats]);

  return {
    stats,
    isBookmarked: isBookmarkedState,
    trackView,
    toggleBookmark: toggleBookmarkState,
    updateStats
  };
};
