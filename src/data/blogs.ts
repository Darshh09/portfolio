export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  views: number;
  featured: boolean;
  popular: boolean;
  readTime: number;
  image?: string;
}

export const blogs: Blog[] = [
  {
    id: 'seo-optimization-react-vite-performance',
    title: 'Complete SEO Optimization Guide for React Vite: Boost Your App\'s Google Rankings',
    excerpt: 'Master SEO optimization for React Vite applications with this comprehensive guide covering meta tags, performance optimization, structured data, and technical SEO strategies that will improve your Google search rankings.',
    content: `
# Complete SEO Optimization Guide for React Vite: Boost Your App's Google Rankings

In today's competitive digital landscape, having a fast, SEO-optimized React Vite application is crucial for success. This comprehensive guide will walk you through every aspect of SEO optimization specifically tailored for React Vite projects, helping you achieve better Google rankings and improved user experience.

## Why SEO Matters for React Vite Applications

React Vite applications face unique SEO challenges that traditional websites don't encounter:

- **Client-side rendering limitations** affecting search engine crawling
- **JavaScript-heavy content** that may not be immediately visible to search engines
- **Dynamic routing** that requires special handling for SEO
- **Performance optimization** directly impacting Core Web Vitals scores

## 1. Meta Tags and Document Head Optimization

### Essential Meta Tags

Start with the fundamental meta tags that search engines rely on:

\`\`\`jsx
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Your Name" />
    </Helmet>
  );
};
\`\`\`

### Dynamic Meta Tags for React Router

Implement dynamic meta tags that update based on your current route:

\`\`\`jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const DynamicSEO = () => {
  const location = useLocation();

  useEffect(() => {
    // Update meta tags based on current route
    const routeData = getRouteData(location.pathname);

    if (routeData) {
      document.title = routeData.title;
      document.querySelector('meta[name="description"]').setAttribute('content', routeData.description);
    }
  }, [location]);

  return (
    <Helmet>
      <title>Default Title</title>
      <meta name="description" content="Default description" />
    </Helmet>
  );
};
\`\`\`

## 2. Performance Optimization for Better Core Web Vitals

### Code Splitting and Lazy Loading

Implement strategic code splitting to improve loading performance:

\`\`\`jsx
import { lazy, Suspense } from 'react';

// Lazy load components based on routes
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Route-based code splitting
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  );
};
\`\`\`

### Image Optimization

Optimize images for better performance and SEO:

\`\`\`jsx
import { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className, priority = false }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lazy load images below the fold
    if (!priority) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );

      observer.observe(document.querySelector(\`[data-image="\${alt}"]\`));
    } else {
      setImageSrc(src);
    }
  }, [src, priority]);

  return (
    <img
      data-image={alt}
      src={imageSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PC9zdmc+'}
      alt={alt}
      className={\`\${className} \${isLoaded ? 'opacity-100' : 'opacity-0'}\`}
      onLoad={() => setIsLoaded(true)}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
\`\`\`

### Bundle Analysis and Optimization

Regularly analyze your bundle to identify optimization opportunities:

\`\`\`bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
\`\`\`

## 3. Server-Side Rendering (SSR) and Static Site Generation (SSG)

### Implementing SSR with Vite

While Vite is primarily a build tool, you can implement SSR for better SEO:

\`\`\`jsx
// server.js
import express from 'express';
import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';

const app = express();

app.get('*', async (req, res) => {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const html = ReactDOMServer.renderToString(<App />);

  res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
});

app.listen(3000);
\`\`\`

### Static Site Generation

Generate static pages for better performance:

\`\`\`jsx
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https://api\.yourdomain\.com/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'phosphor-react'],
        },
      },
    },
  },
});
\`\`\`

## 4. Structured Data and Schema Markup

### JSON-LD Implementation

Add structured data to help search engines understand your content:

\`\`\`jsx
import { Helmet } from 'react-helmet-async';

const StructuredData = ({ data }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data.title,
    "description": data.description,
    "url": data.url,
    "author": {
      "@type": "Person",
      "name": "Darshit Shukla",
      "jobTitle": "Full-Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "BrotherhoodBytes"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrotherhoodBytes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    },
    "datePublished": data.publishedDate,
    "dateModified": data.modifiedDate,
    "mainEntity": {
      "@type": "Article",
      "headline": data.title,
      "articleBody": data.content
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};
\`\`\`

### Breadcrumb Schema

Implement breadcrumb navigation for better SEO:

\`\`\`jsx
const BreadcrumbSchema = ({ breadcrumbs }) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
\`\`\`

## 5. Technical SEO Implementation

### Sitemap Generation

Create dynamic sitemaps for your React application:

\`\`\`jsx
// utils/sitemap.js
export const generateSitemap = (routes) => {
  const baseUrl = 'https://yourdomain.com';

  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  \${routes.map(route => \`
  <url>
    <loc>\${baseUrl}\${route.path}</loc>
    <lastmod>\${route.lastModified}</lastmod>
    <changefreq>\${route.changeFreq}</changefreq>
    <priority>\${route.priority}</priority>
  </url>
  \`).join('')}
</urlset>\`;

  return sitemap;
};

// Generate sitemap on build
const routes = [
  { path: '/', lastModified: new Date().toISOString(), changeFreq: 'daily', priority: '1.0' },
  { path: '/about', lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: '0.8' },
  { path: '/blog', lastModified: new Date().toISOString(), changeFreq: 'weekly', priority: '0.9' },
];

const sitemap = generateSitemap(routes);
\`\`\`

### Robots.txt Configuration

Configure robots.txt for proper search engine crawling:

\`\`\`txt
# public/robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow important pages
Allow: /blog/
Allow: /about/
Allow: /contact/
\`\`\`

## 6. Performance Monitoring and Core Web Vitals

### Core Web Vitals Tracking

Implement monitoring for Core Web Vitals:

\`\`\`jsx
import { useEffect } from 'react';

const CoreWebVitalsMonitor = () => {
  useEffect(() => {
    // Monitor Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);

          // Send to analytics
          if (entry.startTime < 2500) {
            console.log('LCP is good');
          } else if (entry.startTime < 4000) {
            console.log('LCP needs improvement');
          } else {
            console.log('LCP is poor');
          }
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null;
};
\`\`\`

### Performance Budgets

Set and monitor performance budgets:

\`\`\`jsx
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 1MB warning limit
  },
  plugins: [
    {
      name: 'performance-budget',
      generateBundle(options, bundle) {
        const totalSize = Object.values(bundle).reduce((acc, chunk) => {
          if (chunk.type === 'chunk') {
            return acc + chunk.code.length;
          }
          return acc;
        }, 0);

        if (totalSize > 500000) { // 500KB budget
          this.warn('Bundle size exceeds performance budget!');
        }
      },
    },
  ],
});
\`\`\`

## 7. Advanced SEO Techniques

### Preloading Critical Resources

Implement resource hints for better performance:

\`\`\`jsx
import { Helmet } from 'react-helmet-async';

const ResourceHints = () => {
  return (
    <Helmet>
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/critical.css" as="style" />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

      {/* Preconnect to external origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    </Helmet>
  );
};
\`\`\`

### Service Worker for Offline Support

Implement a service worker for better user experience:

\`\`\`jsx
// public/sw.js
const CACHE_NAME = 'your-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        return caches.match('/offline.html');
      })
  );
});
\`\`\`

## 8. SEO Testing and Validation

### Lighthouse CI Integration

Automate performance testing:

\`\`\`bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Create lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
\`\`\`

### SEO Audit Checklist

Regularly audit your SEO implementation:

- [ ] Meta tags are properly implemented
- [ ] Structured data is valid
- [ ] Sitemap is up to date
- [ ] Robots.txt is configured
- [ ] Core Web Vitals are monitored
- [ ] Performance budgets are met
- [ ] Mobile responsiveness is verified
- [ ] Page speed is optimized
- [ ] Internal linking is implemented
- [ ] Alt text is provided for images

## 9. Analytics and SEO Tracking

### Google Analytics 4 Integration

Implement comprehensive tracking:

\`\`\`jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  useEffect(() => {
    // Track custom events
    const trackEvent = (eventName, parameters) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
      }
    };

    // Track user interactions
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-track]')) {
        const trackData = e.target.dataset.track;
        trackEvent('custom_click', { element: trackData });
      }
    });

    return () => {
      document.removeEventListener('click', trackEvent);
    };
  }, []);

  return null;
};
\`\`\`

## 10. Mobile-First SEO Strategy

### Responsive Design Implementation

Ensure mobile-first approach:

\`\`\`css
/* Mobile-first CSS approach */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 750px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
  }
}
\`\`\`

### Touch-Friendly Interface

Optimize for mobile users:

\`\`\`jsx
const TouchOptimizedButton = ({ children, onClick, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="min-h-[44px] min-w-[44px] touch-manipulation"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  );
};
\`\`\`

## Conclusion

SEO optimization for React Vite applications requires a comprehensive approach that addresses both technical and content aspects. By implementing the strategies outlined in this guide, you'll significantly improve your application's search engine visibility and user experience.

Remember that SEO is a long-term investment. Focus on creating high-quality content, optimizing performance, and providing excellent user experience. Monitor your progress regularly and adjust your strategy based on data and search engine algorithm updates.

The key to success is consistency and continuous improvement. Start with the fundamentals, implement performance optimizations, and gradually add advanced SEO features. Your efforts will pay off with improved search rankings and increased organic traffic.

## Additional Resources

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web.dev](https://web.dev/)
- [React Helmet Documentation](https://github.com/nfl/react-helmet)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)

Start implementing these SEO strategies today, and watch your React Vite application climb the search engine rankings!
    `,
    author: 'Darshit Shukla',
    date: '2024-01-20',
    category: 'seo',
    tags: ['SEO', 'React', 'Vite', 'Performance', 'Google Rankings', 'Web Development', 'Search Engine Optimization', 'Core Web Vitals', 'Technical SEO'],
    views: 0,
    featured: true,
    popular: false,
    readTime: 25
  },
  {
    id: 'mastering-react-performance',
    title: 'Mastering React Performance: A Comprehensive Guide to Optimization',
    excerpt: 'Learn the essential techniques to optimize your React applications, from code splitting to memoization strategies that will significantly improve your app\'s performance.',
    content: `
# Mastering React Performance: A Comprehensive Guide to Optimization

Performance optimization in React is crucial for creating smooth, responsive user experiences. In this comprehensive guide, I'll share the most effective techniques I've learned from building production applications.

## Why Performance Matters

Before diving into optimization techniques, it's important to understand why performance optimization is crucial:

- **User Experience**: Faster apps lead to better user engagement
- **SEO Benefits**: Google considers page speed in ranking algorithms
- **Business Impact**: Performance directly affects conversion rates
- **Mobile Users**: Mobile devices often have limited resources

## 1. Code Splitting and Lazy Loading

Code splitting is one of the most effective ways to improve initial load times. React.lazy() and Suspense make this incredibly easy:

\`\`\`jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## 2. Memoization Strategies

React.memo, useMemo, and useCallback are powerful tools for preventing unnecessary re-renders:

\`\`\`jsx
import React, { useMemo, useCallback } from 'react';

const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);

  const handleClick = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.processed}
        </button>
      ))}
    </div>
  );
});
\`\`\`

## 3. Virtual Scrolling for Large Lists

When dealing with large datasets, virtual scrolling can dramatically improve performance:

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={50}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        {data[index].name}
      </div>
    )}
  </List>
);
\`\`\`

## 4. Bundle Analysis and Optimization

Regularly analyze your bundle to identify optimization opportunities:

\`\`\`bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build -- --analyze
\`\`\`

## 5. Image Optimization

Images often account for the largest portion of bundle size:

- Use WebP format when possible
- Implement lazy loading for images
- Consider using next/image for Next.js projects
- Compress images without losing quality

## Performance Monitoring

Implement performance monitoring to track improvements:

\`\`\`jsx
// Custom hook for performance monitoring
const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      console.log(\`\${componentName} render time: \${endTime - startTime}ms\`);
    };
  });
};
\`\`\`

## Best Practices Summary

1. **Always measure before optimizing**
2. **Use React DevTools Profiler**
3. **Implement code splitting early**
4. **Optimize images and assets**
5. **Monitor Core Web Vitals**

## Conclusion

Performance optimization is an ongoing process. Start with the basics like code splitting and memoization, then gradually implement more advanced techniques. Remember to always measure the impact of your optimizations.

The key is to find the right balance between performance and code maintainability. Don't over-optimize prematurely, but always keep performance in mind when making architectural decisions.
    `,
    author: 'Darshit Shukla',
    date: '2024-01-15',
    category: 'react',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript', 'Web Development'],
    views: 15420,
    featured: true,
    popular: true,
    readTime: 8
  },
  {
    id: 'modern-css-techniques',
    title: 'Modern CSS Techniques That Will Transform Your Web Design',
    excerpt: 'Discover cutting-edge CSS features including Grid, Custom Properties, and modern layout techniques that will revolutionize how you approach web design.',
    content: `
# Modern CSS Techniques That Will Transform Your Web Design

CSS has evolved dramatically in recent years, introducing powerful features that make complex layouts and animations much easier to implement. Let me share the most impactful modern CSS techniques I use in my projects.

## CSS Grid: The Game Changer

CSS Grid has revolutionized how we create layouts. It's incredibly powerful and flexible:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  grid-auto-rows: minmax(100px, auto);
}

.item {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

## Custom Properties (CSS Variables)

CSS custom properties make theming and dynamic styling much more manageable:

\`\`\`css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --spacing-unit: 1rem;
  --border-radius: 8px;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}

/* Dynamic theming */
[data-theme="dark"] {
  --primary-color: #a855f7;
  --secondary-color: #7c3aed;
}
\`\`\`

## Advanced Selectors and Pseudo-classes

Modern CSS selectors provide incredible power and specificity:

\`\`\`css
/* Select elements based on their position */
.item:nth-child(3n + 1) {
  background: var(--primary-color);
}

/* Select elements based on their state */
input:focus-within + label {
  color: var(--primary-color);
}

/* Select elements based on their content */
p:has(> img) {
  margin-bottom: 2rem;
}
\`\`\`

## Container Queries

Container queries are the future of responsive design:

\`\`\`css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## Modern Animations and Transitions

CSS animations have become incredibly sophisticated:

\`\`\`css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-element {
  animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}

/* Stagger animations */
.item:nth-child(1) { animation-delay: 0.1s; }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.3s; }
\`\`\`

## Logical Properties

Logical properties make internationalization much easier:

\`\`\`css
.text {
  margin-block: 1rem;
  padding-inline: 2rem;
  border-block-end: 2px solid var(--primary-color);
}

/* Automatically adapts to writing direction */
[dir="rtl"] .text {
  /* No additional CSS needed! */
}
\`\`\`

## CSS Houdini

CSS Houdini gives developers unprecedented control over CSS:

\`\`\`javascript
// Register a custom property
CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  initialValue: 'black',
  inherits: false
});
\`\`\`

## Performance Considerations

While modern CSS is powerful, it's important to consider performance:

- Use \`will-change\` sparingly
- Prefer \`transform\` and \`opacity\` for animations
- Avoid layout-triggering properties in animations
- Use \`contain\` property for optimization

## Browser Support Strategy

Implement progressive enhancement:

\`\`\`css
/* Fallback for older browsers */
.fallback {
  display: block;
}

/* Modern browsers */
@supports (display: grid) {
  .fallback {
    display: grid;
  }
}
\`\`\`

## Conclusion

Modern CSS has transformed web development, making complex layouts and animations accessible to all developers. The key is to understand when and how to use these features effectively.

Start with the basics like Grid and Custom Properties, then gradually incorporate more advanced techniques. Always consider browser support and implement progressive enhancement for the best user experience.
    `,
    author: 'Darshit Shukla',
    date: '2024-01-10',
    category: 'css',
    tags: ['CSS', 'Web Design', 'Layout', 'Grid', 'Animations'],
    views: 12850,
    featured: true,
    popular: false,
    readTime: 10
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices: From Beginner to Advanced',
    excerpt: 'Master TypeScript with practical examples and best practices that will help you write more maintainable and robust code.',
    content: `
# TypeScript Best Practices: From Beginner to Advanced

TypeScript has become an essential tool in modern web development, providing type safety and better developer experience. In this comprehensive guide, I'll share the best practices I've learned from using TypeScript in production applications.

## Why TypeScript Matters

TypeScript offers several key benefits:

- **Catch errors early** during development
- **Better IDE support** with autocomplete and refactoring
- **Improved code documentation** through types
- **Safer refactoring** with confidence
- **Better team collaboration** through clear interfaces

## 1. Type Definitions and Interfaces

Start with clear, well-defined types:

\`\`\`typescript
// Define interfaces for your data structures
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  profile?: {
    avatar: string;
    bio: string;
  };
}

// Use union types for specific values
type Status = 'loading' | 'success' | 'error' | 'idle';

// Generic interfaces for reusable components
interface ApiResponse<T> {
  data: T;
  status: Status;
  message?: string;
}
\`\`\`

## 2. Function Types and Overloads

Define clear function signatures:

\`\`\`typescript
// Function type definitions
type EventHandler = (event: Event) => void;
type AsyncFunction<T> = () => Promise<T>;

// Function overloads for different parameter combinations
function processData(data: string): string;
function processData(data: number): number;
function processData(data: string | number): string | number {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return data * 2;
}

// Generic functions
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
\`\`\`

## 3. Advanced Type Patterns

Leverage TypeScript's advanced type system:

\`\`\`typescript
// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Utility types
type UserWithoutId = Omit<User, 'id'>;
type UserRequired = Required<User>;
type UserReadonly = Readonly<User>;

// Template literal types
type EventName = \`on\${Capitalize<string>}\`;
type ComponentName = \`\${string}Component\`;
\`\`\`

## 4. Error Handling with Types

Create robust error handling patterns:

\`\`\`typescript
// Custom error types
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Result type for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Usage example
function validateUser(user: User): Result<User, ValidationError> {
  if (!user.email.includes('@')) {
    return {
      success: false,
      error: new ValidationError('Invalid email', 'email', 'INVALID_EMAIL')
    };
  }

  return { success: true, data: user };
}
\`\`\`

## 5. React with TypeScript

Type your React components properly:

\`\`\`typescript
import React, { useState, useEffect } from 'react';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    onEdit(user);
    setIsEditing(false);
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};
\`\`\`

## 6. Configuration and Strict Mode

Enable strict mode for better type safety:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## 7. Performance Considerations

TypeScript adds compile-time overhead, but runtime performance is unaffected:

- Use \`const assertions\` for immutable data
- Leverage \`as const\` for literal types
- Use \`satisfies\` operator for type checking without widening

## 8. Testing with TypeScript

Ensure your tests are properly typed:

\`\`\`typescript
import { describe, it, expect } from 'vitest';

describe('User validation', () => {
  it('should validate a valid user', () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    };

    const result = validateUser(user);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(user);
    }
  });
});
\`\`\`

## Best Practices Summary

1. **Start with strict mode enabled**
2. **Define interfaces for all data structures**
3. **Use union types for specific values**
4. **Leverage utility types**
5. **Create custom error types**
6. **Type your React components properly**
7. **Use generic types for reusable code**
8. **Test your types thoroughly**

## Conclusion

TypeScript is a powerful tool that significantly improves code quality and developer experience. Start with the basics and gradually incorporate more advanced patterns.

Remember that TypeScript is there to help you, not to make your code more complex. Use it to express intent clearly and catch errors early in the development process.
    `,
    author: 'Darshit Shukla',
    date: '2024-01-05',
    category: 'typescript',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Best Practices', 'Web Development'],
    views: 9870,
    featured: false,
    popular: true,
    readTime: 12
  }
];

// Helper functions
export const getBlogsByCategory = (category: string): Blog[] => {
  return blogs.filter(blog => blog.category === category);
};

export const getPopularBlogs = (): Blog[] => {
  return blogs.filter(blog => blog.popular).sort((a, b) => b.views - a.views);
};

export const getRecentBlogs = (): Blog[] => {
  return blogs.slice(0, 3).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getFeaturedBlogs = (): Blog[] => {
  return blogs.filter(blog => blog.featured);
};

export const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
