import { cloudStorage, CloudBackup } from './cloudStorage';

export interface BlogView {
  blogId: string;
  timestamp: number;
  sessionId: string;
  userAgent: string;
  referrer?: string;
}

export interface BlogBookmark {
  blogId: string;
  timestamp: number;
  userId?: string; // For future user authentication
  sessionId: string;
}

export interface BlogStats {
  blogId: string;
  totalViews: number;
  uniqueViews: number;
  bookmarks: number;
  lastViewed: number;
}

// Use multiple storage strategies for better persistence
const STORAGE_KEYS = {
  VIEWS: 'portfolio_blog_views',
  VIEW_COUNTS: 'portfolio_blog_view_counts',
  BOOKMARKS: 'portfolio_blog_bookmarks',
  SESSION: 'portfolio_blog_session_id',
  ANALYTICS_VERSION: 'portfolio_analytics_version'
};

const CURRENT_VERSION = '1.0.0';

// In-memory storage (in production, this would be a database)
const blogViews: BlogView[] = [];
const blogBookmarks: BlogBookmark[] = [];

// Generate a unique session ID
const generateSessionId = (): string => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Get or create session ID from localStorage
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(STORAGE_KEYS.SESSION, sessionId);
  }
  return sessionId;
};

// Enhanced storage with fallbacks
const getStorageData = (key: string, defaultValue: any): any => {
  try {
    // Try localStorage first
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    // Try sessionStorage as fallback
    const sessionData = sessionStorage.getItem(key);
    if (sessionData) {
      return JSON.parse(sessionData);
    }

    // Try IndexedDB as another fallback
    if ('indexedDB' in window) {
      // For now, return default, but could implement IndexedDB storage
      return defaultValue;
    }

    return defaultValue;
  } catch (error) {
    console.error(`Error reading storage for key ${key}:`, error);
    return defaultValue;
  }
};

const setStorageData = (key: string, data: any): void => {
  try {
    // Store in localStorage
    localStorage.setItem(key, JSON.stringify(data));

    // Also store in sessionStorage as backup
    sessionStorage.setItem(key, JSON.stringify(data));

    // Could also implement IndexedDB storage here
  } catch (error) {
    console.error(`Error writing storage for key ${key}:`, error);
  }
};

// Track a blog view with enhanced persistence
export const trackBlogView = (blogId: string): void => {
  const sessionId = getSessionId();
  const view: BlogView = {
    blogId,
    timestamp: Date.now(),
    sessionId,
    userAgent: navigator.userAgent,
    referrer: document.referrer || undefined,
  };

  blogViews.push(view);

  // Store in multiple locations for persistence
  const storedViews = getStorageData(STORAGE_KEYS.VIEWS, []);
  storedViews.push(view);
  setStorageData(STORAGE_KEYS.VIEWS, storedViews);

  // Update view count in multiple locations
  const viewCounts = getStorageData(STORAGE_KEYS.VIEW_COUNTS, {});
  viewCounts[blogId] = (viewCounts[blogId] || 0) + 1;
  setStorageData(STORAGE_KEYS.VIEW_COUNTS, viewCounts);

  // Also store in a more persistent way - use URL hash as backup
  try {
    const urlHash = btoa(JSON.stringify(viewCounts));
    if (urlHash.length < 2000) { // URL hash has length limits
      window.history.replaceState(null, '', window.location.pathname + '#' + urlHash);
    }
  } catch (error) {
    console.log('Could not store in URL hash:', error);
  }

  // Backup to cloud storage
  try {
    const backupData: CloudBackup = {
      views: storedViews,
      viewCounts,
      bookmarks: getStorageData(STORAGE_KEYS.BOOKMARKS, []),
      timestamp: Date.now(),
      version: CURRENT_VERSION
    };
    cloudStorage.backupData(backupData);
  } catch (error) {
    console.log('Could not backup to cloud storage:', error);
  }
};

// Get blog statistics with enhanced data recovery
export const getBlogStats = (blogId: string): BlogStats => {
  // Get views from multiple sources
  const memoryViews = blogViews.filter(v => v.blogId === blogId);
  const storedViews = getStorageData(STORAGE_KEYS.VIEWS, []);
  const allViews = [...memoryViews, ...storedViews.filter(v => v.blogId === blogId)];

  // Remove duplicates based on timestamp and sessionId
  const uniqueViews = Array.from(
    new Map(allViews.map(v => [`${v.blogId}-${v.sessionId}-${v.timestamp}`, v])).values()
  );

  const uniqueSessions = new Set(uniqueViews.map(v => v.sessionId)).size;
  const bookmarks = blogBookmarks.filter(b => b.blogId === blogId).length;
  const lastViewed = uniqueViews.length > 0 ? Math.max(...uniqueViews.map(v => v.timestamp)) : 0;

  return {
    blogId,
    totalViews: uniqueViews.length,
    uniqueViews: uniqueSessions,
    bookmarks,
    lastViewed,
  };
};

// Toggle bookmark for a blog with enhanced persistence
export const toggleBookmark = (blogId: string): boolean => {
  const sessionId = getSessionId();
  const existingBookmark = blogBookmarks.find(b => b.blogId === blogId && b.sessionId === sessionId);

  if (existingBookmark) {
    // Remove bookmark
    const index = blogBookmarks.indexOf(existingBookmark);
    blogBookmarks.splice(index, 1);

    // Update multiple storage locations
    const storedBookmarks = getStorageData(STORAGE_KEYS.BOOKMARKS, []);
    const updatedBookmarks = storedBookmarks.filter((b: BlogBookmark) =>
      !(b.blogId === blogId && b.sessionId === sessionId)
    );
    setStorageData(STORAGE_KEYS.BOOKMARKS, updatedBookmarks);

    return false; // Bookmark removed
  } else {
    // Add bookmark
    const bookmark: BlogBookmark = {
      blogId,
      timestamp: Date.now(),
      sessionId,
    };

    blogBookmarks.push(bookmark);

    // Update multiple storage locations
    const storedBookmarks = getStorageData(STORAGE_KEYS.BOOKMARKS, []);
    storedBookmarks.push(bookmark);
    setStorageData(STORAGE_KEYS.BOOKMARKS, storedBookmarks);

    return true; // Bookmark added
  }
};

// Check if a blog is bookmarked by current session
export const isBookmarked = (blogId: string): boolean => {
  const sessionId = getSessionId();
  return blogBookmarks.some(b => b.blogId === blogId && b.sessionId === sessionId);
};

// Get all bookmarked blogs for current session
export const getBookmarkedBlogs = (): string[] => {
  const sessionId = getSessionId();
  return blogBookmarks
    .filter(b => b.sessionId === sessionId)
    .map(b => b.blogId);
};

// Get popular blogs based on views with enhanced data recovery
export const getPopularBlogs = (limit: number = 5): string[] => {
  const viewCounts = getStorageData(STORAGE_KEYS.VIEW_COUNTS, {});

  return Object.entries(viewCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, limit)
    .map(([blogId]) => blogId);
};

// Initialize data from multiple storage sources on app start
export const initializeAnalytics = async (): Promise<void> => {
  try {
    // Check if we need to migrate data
    const version = localStorage.getItem(STORAGE_KEYS.ANALYTICS_VERSION);
    if (version !== CURRENT_VERSION) {
      console.log('Migrating analytics data to new version...');

      // Try to recover data from old keys
      const oldViews = JSON.parse(localStorage.getItem('blog_views') || '[]');
      const oldViewCounts = JSON.parse(localStorage.getItem('blog_view_counts') || '{}');
      const oldBookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');

      // Merge with new storage
      const currentViews = getStorageData(STORAGE_KEYS.VIEWS, []);
      const currentViewCounts = getStorageData(STORAGE_KEYS.VIEW_COUNTS, {});
      const currentBookmarks = getStorageData(STORAGE_KEYS.BOOKMARKS, []);

      // Combine old and new data
      const mergedViews = [...oldViews, ...currentViews];
      const mergedViewCounts = { ...oldViewCounts, ...currentViewCounts };
      const mergedBookmarks = [...oldBookmarks, ...currentBookmarks];

      // Store merged data
      setStorageData(STORAGE_KEYS.VIEWS, mergedViews);
      setStorageData(STORAGE_KEYS.VIEW_COUNTS, mergedViewCounts);
      setStorageData(STORAGE_KEYS.BOOKMARKS, mergedBookmarks);

      // Update version
      localStorage.setItem(STORAGE_KEYS.ANALYTICS_VERSION, CURRENT_VERSION);

      // Clean up old keys
      localStorage.removeItem('blog_views');
      localStorage.removeItem('blog_view_counts');
      localStorage.removeItem('blog_bookmarks');

      console.log('Analytics data migration completed');
    }

    // Restore data from storage
    const storedViews = getStorageData(STORAGE_KEYS.VIEWS, []);
    const storedBookmarks = getStorageData(STORAGE_KEYS.BOOKMARKS, []);

    // Restore views and bookmarks from storage
    blogViews.push(...storedViews);
    blogBookmarks.push(...storedBookmarks);

        // Try to recover from URL hash if available
    try {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const recoveredData = JSON.parse(atob(hash));
        if (recoveredData && typeof recoveredData === 'object') {
          // Merge with existing data
          const currentCounts = getStorageData(STORAGE_KEYS.VIEW_COUNTS, {});
          const mergedCounts = { ...currentCounts, ...recoveredData };
          setStorageData(STORAGE_KEYS.VIEW_COUNTS, mergedCounts);
          console.log('Recovered view counts from URL hash');
        }
      }
    } catch (error) {
      console.log('Could not recover from URL hash:', error);
    }

    // Try to restore from cloud storage
    try {
      const cloudData = await cloudStorage.restoreData();
      if (cloudData) {
        console.log('Restoring data from cloud storage...');

        // Merge cloud data with existing data
        const existingViews = getStorageData(STORAGE_KEYS.VIEWS, []);
        const existingViewCounts = getStorageData(STORAGE_KEYS.VIEW_COUNTS, {});
        const existingBookmarks = getStorageData(STORAGE_KEYS.BOOKMARKS, []);

        // Merge views (avoid duplicates)
        const mergedViews = [...existingViews, ...cloudData.views];
        const uniqueViews = Array.from(
          new Map(mergedViews.map(v => [`${v.blogId}-${v.sessionId}-${v.timestamp}`, v])).values()
        );

        // Merge view counts
        const mergedViewCounts = { ...existingViewCounts, ...cloudData.viewCounts };

        // Merge bookmarks (avoid duplicates)
        const mergedBookmarks = [...existingBookmarks, ...cloudData.bookmarks];
        const uniqueBookmarks = Array.from(
          new Map(mergedBookmarks.map(b => [`${b.blogId}-${b.sessionId}-${b.timestamp}`, b])).values()
        );

        // Store merged data
        setStorageData(STORAGE_KEYS.VIEWS, uniqueViews);
        setStorageData(STORAGE_KEYS.VIEW_COUNTS, mergedViewCounts);
        setStorageData(STORAGE_KEYS.BOOKMARKS, uniqueBookmarks);

        // Update memory arrays
        blogViews.length = 0;
        blogViews.push(...uniqueViews);
        blogBookmarks.length = 0;
        blogBookmarks.push(...uniqueBookmarks);

        console.log('Data restored from cloud storage successfully');
      }
    } catch (error) {
      console.log('Could not restore from cloud storage:', error);
    }

    console.log(`Analytics initialized: ${blogViews.length} views, ${blogBookmarks.length} bookmarks`);
  } catch (error) {
    console.error('Error initializing blog analytics:', error);
  }
};

// Export for use in components
export { blogViews, blogBookmarks };
