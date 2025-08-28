# 🚀 Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. **Resume File Integration** ✅
- [x] Resume PDF placed in `public/resume.pdf`
- [x] File size: 205,621 bytes (~200KB)
- [x] All download buttons updated with correct filename
- [x] Resume included in build output (`dist/resume.pdf`)

### 2. **Vercel Configuration** ✅
- [x] `vercel.json` properly configured
- [x] PDF-specific headers configured
- [x] Resume route added (`/resume.pdf`)
- [x] SPA routing configured for all routes

### 3. **Build Verification** ✅
- [x] `npm run build` successful
- [x] All components compile without errors
- [x] Resume file included in `dist/` folder
- [x] TypeScript compilation successful

## 🎯 Deployment Steps

### **Step 1: Deploy to Vercel**
```bash
# Option 1: Vercel Dashboard
1. Go to vercel.com/dashboard
2. Import your GitHub repository
3. Set build command: npm run build
4. Set output directory: dist
5. Deploy

# Option 2: Vercel CLI
npm i -g vercel
vercel --prod
```

### **Step 2: Verify Resume Download**
After deployment, test these URLs:
- `https://your-domain.vercel.app/resume.pdf` → Should download resume
- `https://your-domain.vercel.app/` → Home page with download buttons
- `https://your-domain.vercel.app/#about` → About section with resume
- `https://your-domain.vercel.app/#contact` → Contact section with resume

### **Step 3: Test All Features**
- [ ] Resume download from Hero section
- [ ] Resume download from About section
- [ ] Resume download from Contact section
- [ ] Resume download via Cmd+K (Command Palette)
- [ ] Contact form opens email client
- [ ] Social links work (GitHub, LinkedIn)
- [ ] Navigation highlighting works correctly
- [ ] All routes work (`/projects`, `/blog`, etc.)

## 🔧 Vercel Configuration Details

### **Routes Configuration**
```json
{
  "routes": [
    {
      "src": "/resume.pdf",
      "dest": "/resume.pdf"
    },
    {
      "src": "/projects",
      "dest": "/index.html"
    },
    {
      "src": "/blog",
      "dest": "/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **PDF Headers Configuration**
```json
{
  "source": "/(.*).pdf",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=86400"
    },
    {
      "key": "Content-Type",
      "value": "application/pdf"
    },
    {
      "key": "Content-Disposition",
      "value": "attachment; filename=\"Darshit_Resume.pdf\""
    }
  ]
}
```

## 📱 Resume Download Locations

### **1. Hero Section (Primary CTA)**
- **File**: `src/components/HeroSection.tsx`
- **Position**: Right alongside "Start a Project" and "View Work"
- **Download**: `Darshit_Resume.pdf`

### **2. About Section (Professional Context)**
- **File**: `src/components/AboutSection.tsx`
- **Position**: After skills, with "Ready to Work Together?"
- **Download**: `Darshit_Resume.pdf`

### **3. Contact Section (Easy Access)**
- **File**: `src/components/ContactSection.tsx`
- **Position**: Professional profile card
- **Download**: `Darshit_Resume.pdf`

### **4. Command Palette (Quick Access)**
- **File**: `src/components/CommandPalette.tsx`
- **Command**: Cmd+K → "Download Resume"
- **Download**: `Darshit_Resume.pdf`

## 🚨 Troubleshooting

### **Resume Not Downloading**
1. **Check file path**: Ensure `public/resume.pdf` exists
2. **Verify build**: Check `dist/resume.pdf` after build
3. **Check Vercel logs**: Look for file serving errors
4. **Test direct URL**: `https://your-domain.vercel.app/resume.pdf`

### **Build Errors**
1. **TypeScript errors**: Run `npm run build` locally first
2. **Missing dependencies**: Ensure all packages are installed
3. **File not found**: Check all import paths are correct

### **Deployment Issues**
1. **Build command**: Ensure it's `npm run build`
2. **Output directory**: Must be `dist`
3. **Node version**: Vercel uses Node 18 (configured in vercel.json)

## 🎉 Success Indicators

### **Resume Download Working**
- ✅ Direct URL access: `/resume.pdf`
- ✅ All download buttons functional
- ✅ Command palette download working
- ✅ File downloads with correct name: `Darshit_Resume.pdf`

### **Portfolio Fully Functional**
- ✅ All routes working (`/`, `/projects`, `/blog`)
- ✅ Navigation highlighting working
- ✅ Contact form functional
- ✅ Social links working
- ✅ Command palette accessible

## 📋 Post-Deployment Checklist

- [ ] Resume downloads from all locations
- [ ] Contact form opens email client
- [ ] All navigation routes work
- [ ] Social media links open correctly
- [ ] Command palette (Cmd+K) works
- [ ] Mobile responsiveness working
- [ ] Performance optimized
- [ ] SEO meta tags working

## 🔗 Important URLs

- **Resume**: `https://your-domain.vercel.app/resume.pdf`
- **GitHub**: https://github.com/Darshh09
- **LinkedIn**: https://www.linkedin.com/in/darshitshukla/
- **Email**: darshitshukla1777@gmail.com

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify all files are in correct locations
3. Test locally with `npm run build` and `npm run preview`
4. Check browser console for JavaScript errors

---

**Your portfolio is now fully configured for Vercel deployment with professional resume download functionality! 🚀**
