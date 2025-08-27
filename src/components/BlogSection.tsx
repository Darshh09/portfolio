import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'phosphor-react';
import { blogs, getRecentBlogs } from '@/data/blogs';
import BlogCard from '@/components/ui/blog-card';
import { useNavigate } from 'react-router-dom';

const BlogSection = () => {
  const navigate = useNavigate();
  const recentBlogs = getRecentBlogs().slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookOpen className="w-4 h-4" />
            Recent Blogs
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Latest Insights &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              Tutorials
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Sharing knowledge and experiences from my journey in web development,
            freelancing, and building successful projects.
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {recentBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard
                blog={blog}
                onClick={() => navigate(`/blog/${blog.id}`)}
                variant="default"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => window.location.href = '/blog'}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              View All Blogs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>

          <p className="text-slate-500 mt-4 text-sm">
            {blogs.length} articles • {blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString()} total views
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
