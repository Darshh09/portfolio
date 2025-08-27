import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import {
  ArrowLeft,
  Eye,
  Clock,
  Calendar,
  User,
  Tag,
  Share,
  Bookmark,
  TwitterLogo,
  LinkedinLogo,
  FacebookLogo
} from 'phosphor-react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogs, formatViews, formatDate } from '@/data/blogs';
import BlogCard from '@/components/ui/blog-card';

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(blogs.find(b => b.id === id));
  const [relatedBlogs, setRelatedBlogs] = useState<typeof blogs>([]);

  useEffect(() => {
    if (blog) {
      // Find related blogs (same category or tags)
      const related = blogs
        .filter(b => b.id !== blog.id && (b.category === blog.category || b.tags.some(tag => blog.tags.includes(tag))))
        .slice(0, 3);
      setRelatedBlogs(related);

      // Highlight code blocks after content is rendered
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog not found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${blog.title}`;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: TwitterLogo,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: FacebookLogo,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
  ];

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
          <motion.button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category Badge */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={`
              inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
              ${blog.category === 'javascript' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
              ${blog.category === 'portfolio' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
              ${blog.category === 'web-development' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
              ${blog.category === 'career' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
              ${blog.category === 'tutorial' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : ''}
              ${blog.category === 'seo' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : ''}
              ${blog.category === 'react' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : ''}
              ${blog.category === 'css' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : ''}
              ${blog.category === 'typescript' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
            `}>
              {blog.category.replace('-', ' ').toUpperCase()}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {blog.title}
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-slate-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{formatViews(blog.views)} views</span>
            </div>
          </motion.div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-slate-800/50 text-slate-400 border border-slate-700/50"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Featured/Popular Badges */}
          <motion.div
            className="flex gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {blog.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                FEATURED
              </span>
            )}
            {blog.popular && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white">
                POPULAR
              </span>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300">
              <Bookmark className="w-4 h-4" />
              Save
            </button>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Share:</span>
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.article>

        {/* Article Content */}
        <motion.div
          className="prose prose-invert prose-lg max-w-none mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-slate-300 leading-relaxed">
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

                        <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                  h4: ({children}) => <h4 className="text-xl font-bold text-white mb-2 mt-4">{children}</h4>,
                  h5: ({children}) => <h5 className="text-lg font-bold text-white mb-2 mt-3">{children}</h5>,
                  h6: ({children}) => <h6 className="text-base font-bold text-white mb-2 mt-2">{children}</h6>,
                  p: ({children}) => <p className="mb-4 leading-relaxed text-slate-300">{children}</p>,
                  li: ({children}) => <li className="ml-4 text-slate-300">{children}</li>,
                  strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                  em: ({children}) => <em className="italic text-slate-300">{children}</em>,
                  code: ({children, className}) => {
                    if (className && className.includes('language-')) {
                      const language = className.replace('language-', '');
                      return (
                        <code className={`language-${language} bg-slate-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm`}>
                          {children}
                        </code>
                      );
                    }
                    return <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm">{children}</code>;
                  },
                  pre: ({children}) => <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto my-4">{children}</pre>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4">{children}</blockquote>,
                  a: ({href, children}) => <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-4 text-slate-300">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-slate-300">{children}</ol>,
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <motion.section
            className="border-t border-slate-800/50 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard
                  key={relatedBlog.id}
                  blog={relatedBlog}
                  onClick={() => navigate(`/blog/${relatedBlog.id}`)}
                  variant="compact"
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
