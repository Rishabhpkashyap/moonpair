import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';
import GoogleAuth from './components/GoogleAuth';
import PinLock from './components/PinLock';
import UserSetup from './components/UserSetup';
import Home from './components/Home';
import Chat from './components/Chat';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import FirebaseStatus from './components/FirebaseStatus';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { HomeIcon, ChatIcon, AnalyticsIcon, SettingsIcon } from './components/Icons';
import { ref, set, get, onValue } from 'firebase/database';
import { database, auth } from './firebase';
import notificationManager from './utils/notifications';

function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useEffect(() => {
    // Check authentication state
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setIsAuthenticated(true);
          setUserId(user.uid);
          
          // Load stored data
          const storedUserRole = localStorage.getItem('userRole');
          const storedProfile = localStorage.getItem('userProfile');
          const setupComplete = localStorage.getItem('setupComplete');
          
          if (storedUserRole) setUserRole(storedUserRole);
          if (storedProfile) setUserProfile(JSON.parse(storedProfile));
          setIsSetupComplete(setupComplete === 'true');
        } else {
          // User is signed out
          setIsAuthenticated(false);
          setUserId(null);
          setUserRole(null);
          setUserProfile(null);
          setIsSetupComplete(false);
        }
        setAuthLoading(false);
      });

      return () => unsubscribe();
    } else {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedPin = localStorage.getItem('appPin');
    const storedTheme = localStorage.getItem('theme') || 'dark';
    
    setTheme(storedTheme);
    
    if (storedPin) {
      setPin(storedPin);
    }

    const handleVisibilityChange = () => {
      if (document.hidden && isAuthenticated && isSetupComplete) {
        setIsLocked(true);
      }
    };

    // Initialize notifications
    const initializeNotifications = async () => {
      if (notificationManager.isNotificationSupported()) {
        await notificationManager.registerServiceWorker();
        // Request permission when user is authenticated
        if (isAuthenticated) {
          await notificationManager.requestPermission();
        }
      }
    };

    // Handle navigation from service worker
    const handleNavigateToChat = (event) => {
      setActiveTab('chat');
      setHasUnreadMessages(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('navigateToChat', handleNavigateToChat);
    
    initializeNotifications();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('navigateToChat', handleNavigateToChat);
    };
  }, [isAuthenticated, isSetupComplete]);

  // Monitor for new chat messages
  useEffect(() => {
    if (!database || !userId || !isAuthenticated || activeTab === 'chat') return;

    const checkForUnreadMessages = async () => {
      try {
        // Get partner info
        const userSnapshot = await get(ref(database, `users/${userId}/partner`));
        if (!userSnapshot.exists()) return;

        const partnerData = userSnapshot.val();
        const partnerId = partnerData.partnerId;
        if (!partnerId) return;

        // Check for messages
        const chatId = [userId, partnerId].sort().join('_');
        const messagesRef = ref(database, `chats/${chatId}/messages`);
        
        const unsubscribe = onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          if (data && activeTab !== 'chat') {
            const messageList = Object.entries(data).map(([id, message]) => ({
              id,
              ...message
            }));
            
            // Check for messages from partner that are newer than last visit
            const lastVisit = localStorage.getItem(`lastChatVisit_${chatId}`) || '0';
            const hasNewMessages = messageList.some(msg => 
              msg.senderId === partnerId && msg.timestamp > parseInt(lastVisit)
            );
            
            setHasUnreadMessages(hasNewMessages);
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error checking for unread messages:', error);
      }
    };

    checkForUnreadMessages();
  }, [database, userId, isAuthenticated, activeTab]);

  const handleAuthSuccess = ({ userId, userRole, userProfile, isNewUser }) => {
    setUserId(userId);
    setUserRole(userRole);
    setUserProfile(userProfile);
    setIsAuthenticated(true);
    
    if (isNewUser) {
      // New user needs to complete setup
      setIsSetupComplete(false);
    } else {
      // Existing user
      setIsSetupComplete(true);
    }
  };

  const handleUserSetupComplete = async (setupData) => {
    const { nickname, gender, userRole: role, cycleData } = setupData;
    
    // Extract name from email
    const emailName = userProfile?.email ? 
      userProfile.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
      'User';
    
    // Save to local storage
    localStorage.setItem('userRole', role);
    localStorage.setItem('userProfile', JSON.stringify({ 
      ...userProfile, 
      name: emailName,
      nickname,
      gender 
    }));
    localStorage.setItem('setupComplete', 'true');
    
    // Save to Firebase
    if (database && userId) {
      try {
        // Save profile
        await set(ref(database, `users/${userId}/profile`), {
          ...userProfile,
          name: emailName,
          nickname,
          gender,
          role,
          updatedAt: Date.now()
        });

        // Save cycle data for female users
        if (cycleData && role === 'primary') {
          await set(ref(database, `users/${userId}/cycle`), {
            ...cycleData,
            updatedAt: Date.now()
          });
        }
      } catch (error) {
        console.error('Error saving setup data to Firebase:', error);
      }
    }
    
    setUserRole(role);
    setUserProfile(prev => ({ ...prev, name: emailName, nickname, gender }));
    setIsSetupComplete(true);
  };

  const handlePinSuccess = (enteredPin) => {
    if (!pin) {
      localStorage.setItem('appPin', enteredPin);
      setPin(enteredPin);
    }
    setIsLocked(false);
  };

  const handleThemeToggle = () => {
    // Theme is now fixed to dark mode
    // This function is kept for compatibility but doesn't change theme
    return;
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Clear local storage
      localStorage.clear();
      // Reset state
      setIsAuthenticated(false);
      setUserId(null);
      setUserRole(null);
      setUserProfile(null);
      setIsSetupComplete(false);
      setIsLocked(true);
      setPin(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading screen while checking auth
  if (authLoading) {
    return (
      <div className={`app ${theme}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 20px' }}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show Google Auth if not authenticated
  if (!isAuthenticated) {
    return <GoogleAuth onAuthSuccess={handleAuthSuccess} theme={theme} />;
  }

  // Show user setup if not completed
  if (!isSetupComplete) {
    return <UserSetup onComplete={handleUserSetupComplete} theme={theme} />;
  }

  // Show PIN lock if locked
  if (isLocked) {
    return <PinLock onSuccess={handlePinSuccess} existingPin={pin} theme={theme} />;
  }

  return (
    <div className={`app ${theme}`}>
      <FirebaseStatus theme={theme} />
      <PWAInstallPrompt />
      <div className="app-container">
        {activeTab === 'home' && <Home userId={userId} userRole={userRole} theme={theme} />}
        {activeTab === 'chat' && <Chat userId={userId} userRole={userRole} theme={theme} onMessagesRead={() => setHasUnreadMessages(false)} activeTab={activeTab} />}
        {activeTab === 'analytics' && <Analytics userId={userId} userRole={userRole} theme={theme} />}
        {activeTab === 'settings' && (
          <Settings 
            userId={userId} 
            userRole={userRole} 
            theme={theme} 
            userProfile={userProfile}
            onThemeToggle={handleThemeToggle}
            onPinChange={() => setIsLocked(true)}
            onSignOut={handleSignOut}
          />
        )}
        
        <nav className="bottom-nav">
          <button 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            <HomeIcon active={activeTab === 'home'} theme={theme} />
            <span className="nav-label">Home</span>
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''} 
            onClick={() => setActiveTab('analytics')}
          >
            <AnalyticsIcon active={activeTab === 'analytics'} theme={theme} />
            <span className="nav-label">Analytics</span>
          </button>
          <button 
            className={activeTab === 'chat' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('chat');
              setHasUnreadMessages(false);
            }}
          >
            <ChatIcon active={activeTab === 'chat'} theme={theme} hasNotification={hasUnreadMessages && activeTab !== 'chat'} />
            <span className="nav-label">Chat</span>
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <SettingsIcon active={activeTab === 'settings'} theme={theme} />
            <span className="nav-label">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;
