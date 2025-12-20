# MoonPair Setup Guide

## Quick Start

1. **Install Dependencies** (Already done)
   ```bash
   npm install
   ```

2. **Firebase Setup**
   - Go to https://console.firebase.google.com
   - Create a new project called "moonpair"
   - Enable Realtime Database
   - Set database rules to:
   ```json
   {
     "rules": {
       ".read": "auth == null",
       ".write": "auth == null"
     }
   }
   ```
   - Copy your config from Project Settings > General > Your apps
   - Replace the config in `src/firebase.js`

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Features Implemented

✅ **User Setup & Role Assignment**
- Name and gender selection on first launch
- Automatic role assignment: Female = Primary User, Male = Partner
- Profile saved to both local storage and Firebase

✅ **PIN Lock Security**
- 4-digit PIN on first launch
- App locks when backgrounded
- PIN stored locally only

✅ **User Roles**
- Primary user (full control)
- Partner (read-only access)

✅ **Home Dashboard**
- Current cycle phase detection
- Period/PMS/Ovulation/Normal phases
- Calendar view with period highlighting
- Period start/end tracking

✅ **Partner Chat**
- Real-time messaging
- Emoji support
- Message timestamps

✅ **Analytics**
- Cycle history
- Average cycle/period length
- Early/late cycle tracking
- Pattern analysis

✅ **Settings**
- Profile management
- Cycle settings (primary user only)
- Partner connection via invite codes
- Theme toggle (light/dark)
- PIN change
- Data deletion

✅ **PWA Support**
- Service worker
- Offline functionality
- App installation
- Mobile-optimized UI

## App Structure

```
src/
├── components/
│   ├── Home.js          # Dashboard with cycle tracking
│   ├── Chat.js          # Partner messaging
│   ├── Analytics.js     # Cycle statistics
│   ├── Settings.js      # App configuration
│   └── PinLock.js       # Security screen
├── firebase.js          # Firebase configuration
├── App.js              # Main app component
└── index.js            # App entry point
```

## Usage Flow

1. **First Launch**: 
   - Enter your name
   - Select gender (👩 Female = Primary User, 👨 Male = Partner)
   - System automatically assigns appropriate role
2. **Set PIN**: Create 4-digit security PIN
3. **Profile Setup**: Configure cycle settings (females only)
4. **Partner Connection** (optional): 
   - Primary user generates 6-digit invite code
   - Partner enters code to connect
5. **Daily Use**: Track periods, view cycle phases, chat

## Security Features

- PIN required on app start and after backgrounding
- Partner has read-only access to health data
- Instant partner disconnect capability
- Complete data deletion option
- All health data stored in Firebase (except PIN)

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with PWA support

## Deployment

For production deployment:
1. Run `npm run build`
2. Deploy the `build/` folder to your hosting service
3. Ensure HTTPS for PWA functionality
4. Configure Firebase security rules for production

The app is now ready to use! 🌙✨