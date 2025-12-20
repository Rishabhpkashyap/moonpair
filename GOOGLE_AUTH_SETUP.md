# Google Authentication Setup Guide

## 🔐 Setting Up Authorized Domains in Firebase

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **uotex-coder**

### Step 2: Enable Google Authentication
1. In the left sidebar, click **"Authentication"**
2. Click on the **"Sign-in method"** tab
3. Find **"Google"** in the providers list
4. Click on **"Google"** to configure it
5. Toggle **"Enable"** to ON
6. Add your **Project support email** (required)
7. Click **"Save"**

### Step 3: Configure Authorized Domains
1. Still in **Authentication > Sign-in method**
2. Scroll down to **"Authorized domains"** section
3. You'll see `localhost` is already added (for development)

#### For Development:
- ✅ `localhost` (already included)
- ✅ `127.0.0.1` (add if needed)

#### For Production:
Add your production domains:
- `yourdomain.com`
- `www.yourdomain.com`
- `moonpair.app` (example)

#### For Testing/Staging:
- `your-app.netlify.app`
- `your-app.vercel.app`
- `your-app.firebase.app`

### Step 4: Add Authorized Domains
1. Click **"Add domain"** button
2. Enter your domain (e.g., `moonpair.netlify.app`)
3. Click **"Add"**
4. Repeat for each domain you need

### Step 5: Configure OAuth Consent Screen (Google Cloud Console)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select the same project as your Firebase project
3. Navigate to **APIs & Services > OAuth consent screen**
4. Configure the consent screen:
   - **App name**: MoonPair
   - **User support email**: Your email
   - **App logo**: Upload MoonPair logo (optional)
   - **App domain**: Your website domain
   - **Authorized domains**: Add the same domains as Firebase
   - **Developer contact**: Your email

### Step 6: OAuth Client Configuration
1. In Google Cloud Console, go to **APIs & Services > Credentials**
2. Find your OAuth 2.0 Client ID (created by Firebase)
3. Click to edit it
4. Add **Authorized JavaScript origins**:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
5. Add **Authorized redirect URIs**:
   - `http://localhost:3000/__/auth/handler` (development)
   - `https://yourdomain.com/__/auth/handler` (production)

## 🌐 Common Domains to Add

### Development:
```
localhost
127.0.0.1
```

### Local Network Testing:
```
192.168.1.100  (your local IP)
10.0.0.100     (your local IP)
```

### Popular Hosting Services:
```
your-app.netlify.app
your-app.vercel.app
your-app.firebase.app
your-app.surge.sh
your-app.github.io
```

### Custom Domains:
```
moonpair.com
www.moonpair.com
app.moonpair.com
```

## 🚨 Important Notes

### Security:
- ⚠️ **Only add domains you control**
- ⚠️ **Don't add wildcard domains** (*.example.com)
- ⚠️ **Use HTTPS in production** (required for OAuth)

### Testing:
- ✅ Test on `localhost:3000` first
- ✅ Test on your staging domain
- ✅ Test on production domain

### Common Issues:
1. **"redirect_uri_mismatch"**: Domain not authorized
2. **"origin_mismatch"**: JavaScript origin not authorized
3. **"access_blocked"**: OAuth consent screen not configured

## 🔧 Quick Setup for Development

If you're just testing locally, make sure these are in your authorized domains:
- `localhost`
- `127.0.0.1`

Your Firebase project should work immediately with:
```
http://localhost:3000
```

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] Add production domain to Firebase authorized domains
- [ ] Add production domain to Google Cloud OAuth client
- [ ] Configure OAuth consent screen
- [ ] Test Google sign-in on production URL
- [ ] Ensure HTTPS is enabled
- [ ] Update Firebase config if needed

## 📱 Mobile App Considerations

If you plan to create a mobile app later:
- Add your app's package name to Firebase
- Configure SHA-1 fingerprints
- Enable Google Sign-In for Android/iOS

## 🆘 Troubleshooting

### Error: "This app isn't verified"
- Complete OAuth consent screen verification
- Add your domain to authorized domains
- Submit for Google verification if needed

### Error: "redirect_uri_mismatch"
- Check authorized domains in Firebase
- Check redirect URIs in Google Cloud Console
- Ensure exact domain match (with/without www)

### Error: "origin_mismatch"
- Add JavaScript origins in Google Cloud Console
- Check protocol (http vs https)
- Verify port numbers match

## 🎯 Current Configuration

Your Firebase project **uotex-coder** should have:
- **Auth Domain**: `uotex-coder.firebaseapp.com`
- **Project ID**: `uotex-coder`

Default authorized domains:
- `localhost` ✅
- `uotex-coder.firebaseapp.com` ✅

Add your custom domains as needed!