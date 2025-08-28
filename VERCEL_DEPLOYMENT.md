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

### **Step 1.5: Configure Custom Domain**
1. **Add Domain**: In Vercel dashboard, go to your project settings
2. **Domain**: Add `darshitdev.in` as your custom domain
3. **DNS Configuration**: Update your domain provider's DNS settings:
   - **Type**: CNAME
   - **Name**: @ (or leave blank)
   - **Value**: cname.vercel-dns.com
4. **Verify**: Vercel will automatically verify your domain
5. **SSL**: HTTPS will be automatically configured

### **Step 2: Verify Resume Download**
After deployment, test these URLs:
- `https://darshitdev.in/resume.pdf` → Should download resume
- `https://darshitdev.in/` → Home page with download buttons
- `https://darshitdev.in/#about` → About section with resume
- `https://darshitdev.in/#contact` → Contact section with resume

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

### **Domain Issues**
1. **DNS Propagation**: Can take up to 48 hours after DNS changes
2. **CNAME Record**: Ensure it points to `cname.vercel-dns.com`
3. **Domain Verification**: Check Vercel dashboard for verification status
4. **SSL Certificate**: Should be automatically issued by Vercel
5. **Domain Provider**: Make sure your domain provider supports CNAME records

## 🎉 Success Indicators

### **Resume Download Working**
- ✅ Direct URL access: `https://darshitdev.in/resume.pdf`
- ✅ All download buttons functional
- ✅ Command palette download working
- ✅ File downloads with correct name: `Darshit_Resume.pdf`

### **Portfolio Fully Functional**
- ✅ All routes working (`https://darshitdev.in/`, `/projects`, `/blog`)
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

## 🌐 Domain-Specific Checklist

- [ ] Domain `darshitdev.in` is active and working
- [ ] HTTPS/SSL certificate is properly configured
- [ ] Resume downloads from `https://darshitdev.in/resume.pdf`
- [ ] All routes work with your domain (`https://darshitdev.in/projects`, etc.)
- [ ] DNS propagation is complete (may take up to 48 hours)
- [ ] Domain is verified in Vercel dashboard

## 🔗 Important URLs

- **Portfolio**: https://darshitdev.in
- **Resume**: https://darshitdev.in/resume.pdf
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
