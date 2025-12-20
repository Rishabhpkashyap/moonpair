# MoonPair - Couple Period Tracker

A modern React PWA for couples to track menstrual cycles together with privacy, security, and real-time synchronization.

![MoonPair](https://img.shields.io/badge/React-18.3.1-blue) ![Firebase](https://img.shields.io/badge/Firebase-10.14.1-orange) ![PWA](https://img.shields.io/badge/PWA-Ready-green)

## 🌟 Features

### 🔐 **Authentication & Security**
- **Google Authentication**: Secure sign-in with Google account
- **PIN Lock Security**: 4-digit PIN protection with app locking
- **Cross-Device Sync**: Access your data from any device securely

### 👥 **User Management**
- **Dual User Roles**: Primary user (full control) and Partner (read-only)
- **Automatic Role Assignment**: Female = Primary User, Male = Partner
- **Partner Connection**: Secure invite code system for partner linking

### 📊 **Cycle Tracking**
- **Phase Tracking**: Period, PMS, Ovulation, and Normal phases
- **Calendar View**: Visual cycle tracking with period highlighting
- **Analytics**: Cycle patterns, statistics, and insights
- **Historical Data**: Complete cycle history with trends

### 💬 **Communication**
- **Partner Chat**: Private messaging between connected partners
- **Real-time Sync**: Firebase Realtime Database for instant updates
- **Notifications**: Chat notifications and period reminders

### 📱 **PWA Features**
- **Installable**: Works as a native mobile app
- **Offline Support**: Core functionality works offline
- **Responsive Design**: Optimized for all screen sizes
- **Theme Support**: Beautiful dark theme

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Firebase account
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moonpair.git
   cd moonpair
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your Firebase config
   # See Firebase Setup section below
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select existing project
3. Enable Google Analytics (optional)

### 2. Configure Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Google** provider
3. Add your domain to authorized domains

### 3. Setup Realtime Database
1. Go to **Realtime Database**
2. Click "Create Database"
3. Choose your region
4. Start in **test mode** (we'll add security rules later)

### 4. Get Configuration
1. Go to **Project Settings** > **General**
2. Scroll to "Your apps" section
3. Click **Web app** icon to add web app
4. Copy the configuration object

### 5. Environment Variables
Edit your `.env` file with the Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.region.firebasedatabase.app
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234
```

### 6. Database Security Rules
Apply the security rules from `firebase-database-rules.json`:

1. Go to **Realtime Database** > **Rules**
2. Copy contents from `firebase-database-rules.json`
3. Click **Publish**

## 📁 Project Structure

```
moonpair/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── components/
│   │   ├── Analytics.js
│   │   ├── Chat.js
│   │   ├── GoogleAuth.js
│   │   ├── Home.js
│   │   ├── Icons.js
│   │   ├── PinLock.js
│   │   ├── Settings.js
│   │   └── UserSetup.js
│   ├── utils/
│   │   └── notifications.js
│   ├── App.js
│   ├── firebase.js
│   └── index.js
├── .env.example
├── .gitignore
├── firebase-database-rules.json
└── package.json
```

## 🗄️ Database Structure

```json
{
  "users": {
    "$userId": {
      "profile": {
        "name": "User Name",
        "email": "user@example.com",
        "photoURL": "https://...",
        "role": "primary",
        "gender": "female"
      },
      "partner": {
        "partnerId": "partnerUserId",
        "partnerName": "Partner Name",
        "partnerEmail": "partner@example.com"
      },
      "cycle": {
        "cycleLength": 28,
        "periodLength": 5,
        "lastPeriodStart": "2024-01-01",
        "lastPeriodEnd": "2024-01-05",
        "history": [...]
      }
    }
  },
  "chats": {
    "$chatId": {
      "messages": {...},
      "metadata": {...}
    }
  },
  "inviteCodes": {
    "$code": {
      "createdBy": "userId",
      "expiresAt": 1640995800000,
      "used": false
    }
  }
}
```

## 🔒 Security Features

- **Environment Variables**: All Firebase credentials secured
- **Database Rules**: Comprehensive security rules included
- **User Isolation**: Users can only access their own data
- **Partner Access**: Controlled access to shared data
- **PIN Protection**: Local device security
- **Secure Chat**: End-to-end partner communication

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Netlify
```bash
# Build the project
npm run build

# Deploy build folder to Netlify
# Add environment variables in Netlify dashboard
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and init
firebase login
firebase init hosting

# Deploy
firebase deploy
```

## 🛠️ Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style
- ESLint configuration included
- Prettier recommended for formatting
- Component-based architecture
- Responsive CSS with custom properties

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- React team for the amazing framework
- date-fns for date manipulation
- All contributors and users

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/moonpair/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

---

**Made with ❤️ for couples who want to track cycles together**