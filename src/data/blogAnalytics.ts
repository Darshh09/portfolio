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

// In-memory storage (in production, this would be a database)
const blogViews: BlogView[] = [];
const blogBookmarks: BlogBookmark[] = [];

// Generate a unique session ID
const generateSessionId = (): string => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Get or create session ID from localStorage
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('blog_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('blog_session_id', sessionId);
  }
  return sessionId;
};

// Track a blog view
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

  // Store in localStorage for persistence across sessions
  const storedViews = JSON.parse(localStorage.getItem('blog_views') || '[]');
  storedViews.push(view);
  localStorage.setItem('blog_views', JSON.stringify(storedViews));

  // Update view count in localStorage
  const viewCounts = JSON.parse(localStorage.getItem('blog_view_counts') || '{}');
  viewCounts[blogId] = (viewCounts[blogId] || 0) + 1;
  localStorage.setItem('blog_view_counts', JSON.stringify(viewCounts));
};

// Get blog statistics
export const getBlogStats = (blogId: string): BlogStats => {
  const views = blogViews.filter(v => v.blogId === blogId);
  const uniqueViews = new Set(views.map(v => v.sessionId)).size;
  const bookmarks = blogBookmarks.filter(b => b.blogId === blogId).length;
  const lastViewed = views.length > 0 ? Math.max(...views.map(v => v.timestamp)) : 0;

  return {
    blogId,
    totalViews: views.length,
    uniqueViews,
    bookmarks,
    lastViewed,
  };
};

// Toggle bookmark for a blog
export const toggleBookmark = (blogId: string): boolean => {
  const sessionId = getSessionId();
  const existingBookmark = blogBookmarks.find(b => b.blogId === blogId && b.sessionId === sessionId);

  if (existingBookmark) {
    // Remove bookmark
    const index = blogBookmarks.indexOf(existingBookmark);
    blogBookmarks.splice(index, 1);

    // Update localStorage
    const storedBookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');
    const updatedBookmarks = storedBookmarks.filter((b: BlogBookmark) =>
      !(b.blogId === blogId && b.sessionId === sessionId)
    );
    localStorage.setItem('blog_bookmarks', JSON.stringify(updatedBookmarks));

    return false; // Bookmark removed
  } else {
    // Add bookmark
    const bookmark: BlogBookmark = {
      blogId,
      timestamp: Date.now(),
      sessionId,
    };

    blogBookmarks.push(bookmark);

    // Update localStorage
    const storedBookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');
    storedBookmarks.push(bookmark);
    localStorage.setItem('blog_bookmarks', JSON.stringify(storedBookmarks));

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

// Get popular blogs based on views
export const getPopularBlogs = (limit: number = 5): string[] => {
  const viewCounts = JSON.parse(localStorage.getItem('blog_view_counts') || '{}');

  return Object.entries(viewCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, limit)
    .map(([blogId]) => blogId);
};

// Initialize data from localStorage on app start
export const initializeAnalytics = (): void => {
  try {
    const storedViews = JSON.parse(localStorage.getItem('blog_views') || '[]');
    const storedBookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');

    // Restore views and bookmarks from localStorage
    blogViews.push(...storedViews);
    blogBookmarks.push(...storedBookmarks);
  } catch (error) {
    console.error('Error initializing blog analytics:', error);
  }
};

// Export for use in components
export { blogViews, blogBookmarks };
