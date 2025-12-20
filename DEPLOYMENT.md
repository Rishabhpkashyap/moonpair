# Deployment Guide

This guide covers deploying MoonPair to various hosting platforms.

## 🔥 Firebase Hosting (Recommended)

### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created
- Billing enabled (for production use)

### Setup
1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `build`
   - Configure as single-page app: Yes
   - Set up automatic builds with GitHub: Optional

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Custom Domain
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Update DNS records as instructed

## ▲ Vercel

### Quick Deploy
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add all REACT_APP_* variables

### GitHub Integration
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variables in dashboard

## 🌐 Netlify

### Manual Deploy
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `build` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=build`

### GitHub Integration
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Site Settings

## 🐳 Docker

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  moonpair:
    build: .
    ports:
      - "80:80"
    environment:
      - REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY}
      - REACT_APP_FIREBASE_AUTH_DOMAIN=${REACT_APP_FIREBASE_AUTH_DOMAIN}
      # ... other env vars
```

## 🔧 Environment Variables

### Required Variables
All platforms need these environment variables:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Security Notes
- Never commit `.env` file to version control
- Use platform-specific secret management
- Rotate keys regularly
- Monitor usage in Firebase Console

## 🚀 CI/CD Pipeline

### GitHub Actions
The included workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the project on push to main
2. Runs tests (if configured)
3. Deploys to Firebase Hosting

### Setup Secrets
Add these secrets to your GitHub repository:
- `REACT_APP_FIREBASE_*` (all Firebase config)
- `FIREBASE_SERVICE_ACCOUNT` (for deployment)
- `FIREBASE_PROJECT_ID`

## 📊 Monitoring

### Firebase Analytics
- Monitor user engagement
- Track feature usage
- Identify performance issues

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## 🔒 Security Checklist

Before deploying:
- [ ] Environment variables configured
- [ ] Firebase security rules applied
- [ ] HTTPS enabled
- [ ] Domain verification completed
- [ ] CSP headers configured (if applicable)
- [ ] Rate limiting enabled
- [ ] Backup strategy in place

## 📱 PWA Deployment

### Service Worker
- Ensure service worker is properly configured
- Test offline functionality
- Verify caching strategies

### App Installation
- Test installation flow on various devices
- Verify app icons and manifest
- Check splash screen appearance

## 🧪 Testing Before Deployment

### Pre-deployment Checklist
- [ ] All features work correctly
- [ ] Authentication flow tested
- [ ] Partner connection tested
- [ ] Chat functionality verified
- [ ] PWA installation works
- [ ] Responsive design verified
- [ ] Performance optimized
- [ ] Security rules tested

### Load Testing
- Test with multiple concurrent users
- Verify Firebase quota limits
- Monitor performance metrics

## 🆘 Troubleshooting

### Common Issues
1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all REACT_APP_ prefixes
   - Verify no trailing spaces
   - Check for special characters

3. **Firebase Connection**
   - Verify project ID matches
   - Check Firebase rules
   - Ensure billing is enabled

4. **PWA Issues**
   - Clear browser cache
   - Check service worker registration
   - Verify manifest.json

### Getting Help
- Check Firebase Console logs
- Review browser developer tools
- Check platform-specific documentation
- Create GitHub issue if needed