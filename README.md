# Portfolio Website

A modern, responsive portfolio website built with **Vite + React**, TypeScript, and Tailwind CSS. Features include a beautiful UI, blog system with analytics, and smooth animations.

## 🚀 Features

- **Modern Design**: Built with Tailwind CSS and Framer Motion
- **Blog System**: Complete blog with view tracking and bookmarks
- **Analytics Dashboard**: Real-time blog statistics and performance metrics
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags, structured data, and performance optimizations
- **Dark Theme**: Beautiful dark theme with galactic animations
- **Fast Development**: Vite's lightning-fast HMR and build times
- **Modern React**: Built with React 18 and latest features

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (Fast, modern build tool)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Routing**: React Router DOM (Client-side routing)
- **UI Components**: Radix UI + Custom Components
- **Deployment**: Vercel (Static site hosting)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

This project is configured for deployment on **Vercel**.

### 🎯 Live Demo
- **Portfolio**: [https://darshitdev.in](https://darshitdev.in)
- **Resume Download**: [https://darshitdev.in/resume.pdf](https://darshitdev.in/resume.pdf)

### Vercel Configuration

The project includes:
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment
- Client-side routing support for `/blog` routes
- Security headers and caching optimization
- Custom domain configuration for `darshitdev.in`

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Deploy** - Vercel will automatically detect the configuration

### Environment Variables

No environment variables are required for basic deployment.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Base UI components (buttons, cards, etc.)
│   └── ...            # Feature-specific components
├── pages/              # Page components
├── data/               # Static data and analytics
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Images and static assets
```

## 🔧 Configuration

### Why Vite + React?

- **Lightning Fast**: Vite's instant server start and HMR
- **Modern Build**: ES modules and native browser support
- **Optimized Output**: Tree-shaking and code splitting
- **Developer Experience**: Fast refresh and hot module replacement
- **Production Ready**: Optimized builds for deployment

### Blog Analytics

The blog system includes:
- View tracking with persistent storage
- Bookmark functionality
- Real-time statistics
- Cloud storage backup system

### Routing

All routes are handled by React Router:
- `/` - Home page
- `/blog` - Blog listing
- `/blog/:id` - Individual blog posts
- `/blog/analytics` - Analytics dashboard

## 🎨 Customization

### Colors and Theme

Update `tailwind.config.ts` to customize:
- Color scheme
- Typography
- Spacing
- Animations

### Content

- **Blogs**: Edit `src/data/blogs.ts`
- **Projects**: Edit `src/data/projects.ts`
- **Profile**: Update `src/components/AboutSection.tsx`

## 📊 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Optimized images with proper formats
- **Bundle Analysis**: Built-in bundle analysis tools
- **Lighthouse**: Optimized for Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your Vercel configuration
3. Ensure all dependencies are installed
4. Check the browser's developer tools

---

Built with ❤️ using React, TypeScript, and Vite
