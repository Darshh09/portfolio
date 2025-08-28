# 🚀 Vercel Deployment Guide

This guide will help you deploy your portfolio website to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- Your portfolio repository pushed to a Git provider
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare Your Repository

Ensure your repository has:
- ✅ `vercel.json` configuration file
- ✅ `.vercelignore` file
- ✅ `package.json` with build scripts
- ✅ All source code committed and pushed

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your repository** from GitHub/GitLab/Bitbucket
4. **Configure project settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Click "Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd portfolio
   vercel
   ```

4. **Follow the prompts** to configure your project

## Step 3: Configure Domain (Optional)

1. **Go to your project dashboard** on Vercel
2. **Click "Settings" → "Domains"**
3. **Add your custom domain** (e.g., `portfolio.yourname.com`)
4. **Configure DNS** as instructed by Vercel

## Step 4: Environment Variables (If Needed)

Currently, no environment variables are required. If you add any later:

1. **Go to project settings** → "Environment Variables"
2. **Add your variables** for production
3. **Redeploy** to apply changes

## Step 5: Verify Deployment

After deployment, verify:

- ✅ **Homepage loads** at `/`
- ✅ **Blog routes work** at `/blog`
- ✅ **Individual blog posts** load at `/blog/:id`
- ✅ **Analytics dashboard** works at `/blog/analytics`
- ✅ **Images display** correctly
- ✅ **Responsive design** works on mobile

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build locally first
npm run build

# Verify all dependencies are installed
npm install
```

#### 2. Routing Issues
- Ensure `vercel.json` has correct route configuration
- Check that all routes redirect to `index.html`

#### 3. Image Loading Issues
- Verify images are in the `public/` folder
- Check image paths in components
- Ensure images are committed to Git

#### 4. Performance Issues
- Run `npm run build` locally to check bundle size
- Verify `.vercelignore` excludes unnecessary files
- Check browser console for errors

### Debug Commands

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Check bundle size
npm run build -- --analyze

# Lint code
npm run lint
```

## Automatic Deployments

Vercel automatically deploys when you:
- **Push to main branch** → Production deployment
- **Create pull requests** → Preview deployments
- **Push to other branches** → Branch deployments

## Performance Optimization

Your `vercel.json` includes:
- **Security headers** for XSS protection
- **Cache headers** for static assets
- **Route optimization** for SPA routing
- **CDN distribution** via Vercel's edge network

## Monitoring

Vercel provides:
- **Real-time analytics** for your site
- **Performance monitoring** with Core Web Vitals
- **Error tracking** and logging
- **Uptime monitoring**

## Support

If you encounter issues:
1. **Check Vercel deployment logs**
2. **Verify local build works**
3. **Check browser console for errors**
4. **Review Vercel documentation**
5. **Contact Vercel support** if needed

---

🎉 **Your portfolio is now live on Vercel!** 🎉
