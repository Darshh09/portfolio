import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  TrendUp,
  Clock,
  Star,
  MagnifyingGlass,
  Funnel,
  ArrowLeft
} from 'phosphor-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  blogs,
  getBlogsByCategory,
  getPopularBlogs,
  getRecentBlogs,
  getFeaturedBlogs,
  formatViews,
  formatDate
} from '@/data/blogs';
import BlogCard from '@/components/ui/blog-card';

const Blog = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState(category || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Debug logging
  useEffect(() => {
    console.log('Blog component mounted');
    console.log('Current category:', category);
    console.log('Active tab:', activeTab);
    console.log('Total blogs:', blogs.length);
  }, [category, activeTab]);

  const tabs = [
    { id: 'all', label: 'All Posts', count: blogs.length },
    { id: 'featured', label: 'Featured', count: getFeaturedBlogs().length },
    { id: 'popular', label: 'Popular', count: getPopularBlogs().length },
    { id: 'recent', label: 'Recent', count: getRecentBlogs().length },
    { id: 'react', label: 'React', count: getBlogsByCategory('react').length },
    { id: 'css', label: 'CSS', count: getBlogsByCategory('css').length },
    { id: 'typescript', label: 'TypeScript', count: getBlogsByCategory('typescript').length }
  ];

  useEffect(() => {
    let filtered = blogs;

    // Filter by tab
    if (activeTab === 'featured') {
      filtered = getFeaturedBlogs();
    } else if (activeTab === 'popular') {
      filtered = getPopularBlogs();
    } else if (activeTab === 'recent') {
      filtered = getRecentBlogs();
    } else if (activeTab !== 'all') {
      filtered = getBlogsByCategory(activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  }, [activeTab, searchQuery]);

  const getTabBlogs = () => {
    switch (activeTab) {
      case 'featured':
        return getFeaturedBlogs();
      case 'popular':
        return getPopularBlogs();
      case 'recent':
        return getRecentBlogs();
      case 'all':
        return blogs;
      default:
        return getBlogsByCategory(activeTab);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  console.log('Blog component rendering...');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <motion.header
        className="relative py-8 px-4 md:px-8 lg:px-16 border-b border-slate-800/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Portfolio
            </motion.button>

            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Blog</h1>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Search and Stats */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Latest Insights & Tutorials
              </h2>
              <p className="text-slate-400">
                {blogs.length} articles • {blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString()} total views
              </p>
            </div>

            <div className="relative w-full lg:w-96">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 border border-slate-700/50'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 rounded-full text-xs bg-slate-700/50">
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard
                    blog={blog}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    variant="default"
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No articles found</h3>
                <p className="text-slate-500">
                  {searchQuery ? `No articles match "${searchQuery}"` : 'No articles in this category'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Results count */}
        {filteredBlogs.length > 0 && (
          <motion.div
            className="mt-12 text-center text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Showing {filteredBlogs.length} of {blogs.length} articles
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
