import { motion } from 'framer-motion';
import { Eye, Clock, Calendar, User, Tag } from 'phosphor-react';
import { Blog, formatViews, formatDate } from '@/data/blogs';

interface BlogCardProps {
  blog: Blog;
  onClick?: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({ blog, onClick, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

      const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -8
    }
  };

  const content = (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm
        transition-all duration-300 hover:border-slate-700/70 hover:bg-slate-800/50
        ${isFeatured ? 'col-span-2 row-span-2' : ''}
        ${isCompact ? 'p-4' : 'p-6'}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Category badge */}
      <div className="relative z-10 mb-4">
        <span className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${blog.category === 'javascript' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
          ${blog.category === 'portfolio' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
          ${blog.category === 'web-development' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
          ${blog.category === 'career' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
          ${blog.category === 'tutorial' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : ''}
        `}>
          {blog.category.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <h3 className={`
        relative z-10 font-bold text-slate-100 mb-3 line-clamp-2
        ${isFeatured ? 'text-2xl md:text-3xl' : isCompact ? 'text-lg' : 'text-xl'}
        ${onClick ? 'group-hover:text-blue-400 transition-colors duration-300' : ''}
      `}>
        {blog.title}
      </h3>

      {/* Excerpt */}
      {!isCompact && (
        <p className="relative z-10 text-slate-400 mb-4 line-clamp-3 text-sm">
          {blog.excerpt}
        </p>
      )}

      {/* Metadata */}
      <div className="relative z-10 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{formatViews(blog.views)} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{blog.readTime} min read</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(blog.publishedDate)}</span>
        </div>
        {!isCompact && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {!isCompact && blog.tags.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-xs text-slate-500">+{blog.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Featured indicator */}
      {blog.featured && !isCompact && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            FEATURED
          </span>
        </div>
      )}

      {/* Popular indicator */}
      {blog.popular && !isCompact && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white">
            POPULAR
          </span>
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" />
    </motion.div>
  );

  if (onClick) {
    return (
      <motion.div
        className="group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
