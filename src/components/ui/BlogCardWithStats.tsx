import { useBlogAnalytics } from '@/hooks/useBlogAnalytics';
import BlogCard from './blog-card';
import { Blog } from '@/data/blogs';

interface BlogCardWithStatsProps {
  blog: Blog;
  onClick?: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCardWithStats({ blog, onClick, variant }: BlogCardWithStatsProps) {
  const { stats } = useBlogAnalytics(blog.id);

  // Create a blog object with real-time stats
  const blogWithLiveStats = {
    ...blog,
    views: stats.totalViews
  };

  return (
    <BlogCard
      blog={blogWithLiveStats}
      onClick={onClick}
      variant={variant}
    />
  );
}
