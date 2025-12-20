import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, googleProvider, database } from '../firebase';
import { MoonIcon } from './Icons';
import './GoogleAuth.css';

// Compact SVG Icons for benefits
const SyncIcon = ({ size = 20, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M23 4V10H17" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M20.49 15C19.9828 16.8393 18.9228 18.4804 17.4612 19.7006C15.9996 20.9207 14.2019 21.6584 12.2856 21.8084C10.3694 21.9584 8.44444 21.5128 6.77579 20.5309C5.10714 19.5491 3.78024 18.0782 2.95936 16.3006C2.13848 14.5231 1.8654 12.5236 2.17716 10.5644C2.48891 8.60516 3.36134 6.78677 4.688 5.35543C6.01466 3.92409 7.7319 2.94901 9.6344 2.55134C11.5369 2.15367 13.5307 2.34901 15.3200 3.11L17 4" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M1 20V14H7" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = ({ size = 20, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 22S8 18 8 13V7L12 5L16 7V13C16 18 12 22 12 22Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(255, 105, 180, 0.1)"
    />
    <path 
      d="M9 12L11 14L15 10" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const CloudIcon = ({ size = 20, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 10H16.74C16.24 6.67 13.5 4 10 4C6.5 4 3.76 6.67 3.26 10H2C0.9 10 0 10.9 0 12S0.9 14 2 14H18C19.1 14 20 13.1 20 12S19.1 10 18 10Z" 
      fill="rgba(255, 105, 180, 0.1)"
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 17L12 13L16 17" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

function GoogleAuth({ onAuthSuccess, theme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider || !database) {
      setError('Authentication service not available');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user already exists in database
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      let userData;
      let isNewUser = false;
      
      if (snapshot.exists()) {
        // Existing user - load their data
        userData = snapshot.val();
      } else {
        // New user - create profile
        isNewUser = true;
        userData = {
          profile: {
            name: user.displayName || '',
            email: user.email,
            photoURL: user.photoURL,
            role: 'primary', // Default role, can be changed later
            createdAt: Date.now()
          },
          cycle: {
            cycleLength: 28,
            periodLength: 5,
            history: []
          }
        };
        
        // Save new user to database
        await set(userRef, userData);
      }

      // Store auth info locally
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userRole', userData.profile.role);
      localStorage.setItem('userProfile', JSON.stringify({
        name: userData.profile.name,
        email: userData.profile.email,
        photoURL: userData.profile.photoURL,
        gender: userData.profile.gender || 'unknown'
      }));
      localStorage.setItem('setupComplete', 'true');

      // Call success callback
      onAuthSuccess({
        userId: user.uid,
        userRole: userData.profile.role,
        userProfile: userData.profile,
        isNewUser
      });

    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // Provide specific error messages
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      
      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups and try again.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized. Please contact support.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in is not enabled. Please contact support.';
      } else if (error.message.includes('redirect_uri_mismatch')) {
        errorMessage = 'Domain configuration error. Please contact support.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`google-auth ${theme}`}>
      <div className="auth-container">
        <div className="auth-header">
          <MoonIcon size={64} />
          <h1>Welcome to MoonPair</h1>
          <p>Sign in with Google to sync your data across devices</p>
        </div>

        <div className="auth-content">
          <div className="auth-benefits">
            <div className="benefit-item">
              <SyncIcon size={18} />
              <span>Sync across devices</span>
            </div>
            <div className="benefit-item">
              <ShieldIcon size={18} />
              <span>Secure cloud backup</span>
            </div>
            <div className="benefit-item">
              <CloudIcon size={18} />
              <span>Never lose your data</span>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="google-signin-btn"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="auth-privacy">
            <p>Your privacy is protected. We only access basic profile information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleAuth;