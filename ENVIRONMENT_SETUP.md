# Environment Setup Guide

## Firebase Environment Variables

Your Firebase credentials are now securely stored in environment variables. Follow these steps:

### 1. Environment Variables (.env file)

The `.env` file contains your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_DATABASE_URL=your_database_url_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 2. Security Notes

- ✅ The `.env` file is added to `.gitignore` to prevent committing credentials
- ✅ Firebase config now uses `process.env` variables
- ✅ All sensitive data is externalized from source code

### 3. Deployment

For production deployment, set these environment variables in your hosting platform:

#### Vercel
```bash
vercel env add REACT_APP_FIREBASE_API_KEY
vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN
# ... add all other variables
```

#### Netlify
Add environment variables in Site Settings > Environment Variables

#### Other Platforms
Consult your hosting provider's documentation for setting environment variables.

### 4. Local Development

1. Ensure the `.env` file is in your project root
2. Restart your development server after adding/changing environment variables
3. Variables must start with `REACT_APP_` to be accessible in React

### 5. Firebase Database Rules

Apply the rules from `firebase-database-rules.json` to your Firebase Realtime Database:

1. Go to Firebase Console > Realtime Database > Rules
2. Copy the contents of `firebase-database-rules.json`
3. Paste and publish the rules

## Troubleshooting

- If environment variables aren't loading, restart your development server
- Ensure all variable names start with `REACT_APP_`
- Check that the `.env` file is in the project root directory
- Verify Firebase project settings match your environment variables