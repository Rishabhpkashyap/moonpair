# Firebase Setup Instructions

## 🚨 IMPORTANT: Enable Realtime Database

The error you're seeing is because **Realtime Database is not enabled** in your Firebase project. Here's how to fix it:

### Step 1: Enable Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **uotex-coder**
3. In the left sidebar, click **"Realtime Database"**
4. Click **"Create Database"**
5. Choose **"Start in test mode"** for now
6. Select a location (choose the closest to your users)

### Step 2: Set Database Rules (Important for Security)

Once the database is created, go to the **"Rules"** tab and set:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Note:** These are permissive rules for development. For production, you should implement proper authentication and security rules.

### Step 3: Verify Database URL

Your database URL should be:
```
https://uotex-coder-default-rtdb.firebaseio.com/
```

If it's different, update it in `src/firebase.js`

### Step 4: Test the Connection

After enabling Realtime Database:
1. Refresh your browser (http://localhost:3000)
2. The app should now load without errors
3. You'll see the PIN setup screen

## Alternative: Use a Different Firebase Project

If you prefer to create a new project specifically for MoonPair:

1. Create a new Firebase project called "moonpair"
2. Enable Realtime Database
3. Copy the new config and replace it in `src/firebase.js`

## Current Configuration

Your app is currently configured to use:
- Project: **uotex-coder**
- Database URL: **https://uotex-coder-default-rtdb.firebaseio.com/**

Once you enable Realtime Database, the app will work perfectly! 🌙✨