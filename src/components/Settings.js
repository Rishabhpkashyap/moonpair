import React, { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../firebase';
import { 
  UserIcon, 
  CycleIcon, 
  PartnerIcon, 
  SecurityIcon, 
  BellIcon,
  LogOutIcon,
  LockIcon,
  EditIcon,
  DeleteIcon,
  RefreshIcon,
  CopyIcon,
  SmallHeartIcon,
  NotificationIcon
} from './Icons';
import notificationManager from '../utils/notifications';
import './Settings.css';

function Settings({ userId, userRole, theme, userProfile, onThemeToggle, onPinChange, onSignOut }) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditCycle, setShowEditCycle] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showPartnerActions, setShowPartnerActions] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Profile editing state
  const [editedProfile, setEditedProfile] = useState({
    nickname: userProfile?.nickname || '',
    email: userProfile?.email || ''
  });
  
  // Cycle editing state
  const [editedCycle, setEditedCycle] = useState({
    cycleLength: 28,
    periodLength: 5
  });
  
  // Partner connection state
  const [inviteCode, setInviteCode] = useState('');
  const [connectCode, setConnectCode] = useState('');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [partnerConnected, setPartnerConnected] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [codeTimeLeft, setCodeTimeLeft] = useState(0);

  useEffect(() => {
    // Load cycle data from localStorage or Firebase
    const storedCycle = localStorage.getItem('cycleData');
    if (storedCycle) {
      const cycleData = JSON.parse(storedCycle);
      setEditedCycle({
        cycleLength: cycleData.cycleLength || 28,
        periodLength: cycleData.periodLength || 5
      });
    }
    
    // Check partner connection status
    const partnerData = localStorage.getItem('partnerData');
    if (partnerData) {
      const partner = JSON.parse(partnerData);
      setPartnerConnected(true);
      setPartnerName(partner.partnerName || partner.nickname || partner.name || 'Partner');
    }
    
    // Also check Firebase for partner connection
    const checkPartnerConnection = async () => {
      if (database && userId) {
        try {
          const partnerSnapshot = await get(ref(database, `users/${userId}/partner`));
          if (partnerSnapshot.exists()) {
            const partner = partnerSnapshot.val();
            setPartnerConnected(true);
            setPartnerName(partner.partnerName || 'Partner');
            
            // Update localStorage
            localStorage.setItem('partnerData', JSON.stringify(partner));
          }
        } catch (error) {
          console.error('Error checking partner connection:', error);
        }
      }
    };
    
    checkPartnerConnection();
  }, [database, userId]);

  const handleSaveProfile = () => {
    // Save profile changes
    const updatedProfile = {
      ...userProfile,
      nickname: editedProfile.nickname,
      email: editedProfile.email
    };
    
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setShowEditProfile(false);
    
    // TODO: Save to Firebase
    console.log('Profile saved:', updatedProfile);
  };

  const handleSaveCycle = () => {
    // Save cycle changes
    const cycleData = {
      cycleLength: editedCycle.cycleLength,
      periodLength: editedCycle.periodLength,
      updatedAt: Date.now()
    };
    
    localStorage.setItem('cycleData', JSON.stringify(cycleData));
    setShowEditCycle(false);
    
    // TODO: Save to Firebase
    console.log('Cycle data saved:', cycleData);
  };

  const handleGenerateInviteCode = async () => {
    setIsGeneratingCode(true);
    
    try {
      // Generate a 6-character alphanumeric code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const expirationTime = Date.now() + (15 * 60 * 1000); // 15 minutes from now
      
      // Save code to Firebase with expiration and user info
      if (database && userId) {
        await set(ref(database, `inviteCodes/${code}`), {
          createdBy: userId,
          createdByEmail: userProfile?.email,
          createdByName: userProfile?.nickname || userProfile?.name,
          createdAt: Date.now(),
          expiresAt: expirationTime,
          used: false
        });
        
        console.log('Invite code saved to Firebase:', code);
      }
      
      setInviteCode(code);
      setCodeTimeLeft(15 * 60); // 15 minutes in seconds
      
      // Start countdown timer
      const countdown = setInterval(() => {
        setCodeTimeLeft(prev => {
          if (prev <= 1) {
            // Code expired
            setInviteCode('');
            clearInterval(countdown);
            
            // Remove expired code from Firebase
            if (database) {
              set(ref(database, `inviteCodes/${code}`), null);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error generating invite code:', error);
      alert('Failed to generate invite code. Please try again.');
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleConnectPartner = async () => {
    if (connectCode.length !== 6) return;
    
    try {
      // Check if code exists and is valid in Firebase
      if (database) {
        const codeRef = ref(database, `inviteCodes/${connectCode}`);
        const snapshot = await get(codeRef);
        
        if (!snapshot.exists()) {
          alert('Invalid invite code. Please check the code and try again.');
          return;
        }
        
        const codeData = snapshot.val();
        
        // Check if code is expired
        if (Date.now() > codeData.expiresAt) {
          alert('This invite code has expired. Please ask for a new one.');
          // Remove expired code
          await set(codeRef, null);
          return;
        }
        
        // Check if code is already used
        if (codeData.used) {
          alert('This invite code has already been used.');
          return;
        }
        
        // Mark code as used
        await set(ref(database, `inviteCodes/${connectCode}/used`), true);
        await set(ref(database, `inviteCodes/${connectCode}/usedBy`), userId);
        await set(ref(database, `inviteCodes/${connectCode}/usedAt`), Date.now());
        
        // Create partner connection
        const partnerUserId = codeData.createdBy;
        
        // Add partner relationship in both user records
        await set(ref(database, `users/${userId}/partner`), {
          partnerId: partnerUserId,
          partnerEmail: codeData.createdByEmail,
          partnerName: codeData.createdByName,
          connectedAt: Date.now()
        });
        
        await set(ref(database, `users/${partnerUserId}/partner`), {
          partnerId: userId,
          partnerEmail: userProfile?.email,
          partnerName: userProfile?.nickname || userProfile?.name,
          connectedAt: Date.now()
        });
        
        // Update local state
        setPartnerConnected(true);
        setPartnerName(codeData.createdByName);
        
        // Save to localStorage
        localStorage.setItem('partnerData', JSON.stringify({
          partnerId: partnerUserId,
          partnerEmail: codeData.createdByEmail,
          partnerName: codeData.createdByName,
          connectedAt: Date.now()
        }));
        
        setConnectCode('');
        console.log('Successfully connected to partner:', codeData.createdByName);
        alert(`Successfully connected to ${codeData.createdByName}!`);
        
      }
    } catch (error) {
      console.error('Error connecting to partner:', error);
      alert('Failed to connect to partner. Please try again.');
    }
  };

  const handleDisconnectPartner = async () => {
    try {
      if (database && userId) {
        // Get current partner info
        const partnerSnapshot = await get(ref(database, `users/${userId}/partner`));
        
        if (partnerSnapshot.exists()) {
          const partnerData = partnerSnapshot.val();
          const partnerId = partnerData.partnerId;
          
          // Remove partner relationship from both users
          await set(ref(database, `users/${userId}/partner`), null);
          await set(ref(database, `users/${partnerId}/partner`), null);
          
          console.log('Partner relationship removed from Firebase');
        }
      }
      
      // Update local state
      setPartnerConnected(false);
      setPartnerName('');
      localStorage.removeItem('partnerData');
      setShowPartnerActions(false);
      
      console.log('Partner disconnected successfully');
      alert('Partner disconnected successfully.');
      
    } catch (error) {
      console.error('Error disconnecting partner:', error);
      alert('Failed to disconnect partner. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Delete user data from Firebase first
      if (database && userId) {
        await set(ref(database, `users/${userId}`), null);
        console.log('User data deleted from Firebase');
      }
      
      // Delete Firebase Auth account
      if (auth.currentUser) {
        await auth.currentUser.delete();
        console.log('Firebase Auth account deleted');
      }
      
      // Clear local storage and sign out (this will trigger app state reset)
      localStorage.clear();
      onSignOut();
      
      console.log('Account successfully deleted');
    } catch (error) {
      console.error('Error deleting account:', error);
      
      // If Firebase deletion fails, still clear local data and sign out
      localStorage.clear();
      onSignOut();
      
      // Show error to user (you might want to add a toast notification here)
      alert('There was an error deleting your account from the server, but local data has been cleared. Please contact support if needed.');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleResetAccount = async () => {
    try {
      // Reset user data in Firebase while keeping authentication
      if (database && userId) {
        // Clear cycle data
        await set(ref(database, `users/${userId}/cycle`), null);
        
        // Clear partner connection
        const partnerSnapshot = await get(ref(database, `users/${userId}/partner`));
        if (partnerSnapshot.exists()) {
          const partnerData = partnerSnapshot.val();
          const partnerId = partnerData.partnerId;
          
          // Remove partner relationship from both users
          await set(ref(database, `users/${userId}/partner`), null);
          if (partnerId) {
            await set(ref(database, `users/${partnerId}/partner`), null);
          }
        }
        
        // Clear chat data
        const userChats = await get(ref(database, 'chats'));
        if (userChats.exists()) {
          const chats = userChats.val();
          for (const chatId in chats) {
            if (chatId.includes(userId)) {
              await set(ref(database, `chats/${chatId}`), null);
            }
          }
        }
        
        console.log('Account data reset in Firebase');
      }
      
      // Clear local storage data (except authentication)
      localStorage.removeItem('cycleData');
      localStorage.removeItem('partnerData');
      localStorage.removeItem('userRole');
      localStorage.removeItem('setupComplete');
      
      // Reset local state
      setPartnerConnected(false);
      setPartnerName('');
      setEditedCycle({
        cycleLength: 28,
        periodLength: 5
      });
      
      console.log('Account successfully reset');
      alert('Account reset successfully! You can now set up your account again.');
      
      // Refresh the page to restart the setup process
      window.location.reload();
      
    } catch (error) {
      console.error('Error resetting account:', error);
      alert('There was an error resetting your account. Please try again.');
    } finally {
      setShowResetConfirm(false);
    }
  };

  const handleChangePIN = () => {
    onPinChange();
  };

  const handleNotifications = async () => {
    if (!notificationManager.isNotificationSupported()) {
      alert('Notifications are not supported on this device.');
      return;
    }

    const permission = await notificationManager.requestPermission();
    if (permission) {
      alert('Notifications enabled! You will now receive chat notifications.');
    } else {
      alert('Notification permission denied. You can enable it in your browser settings.');
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      alert('Invite code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy code:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = inviteCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Invite code copied to clipboard!');
    }
  };

  return (
    <div className="settings">
      {/* Centered Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar-center">
          {userProfile?.photoURL ? (
            <img 
              src={userProfile.photoURL} 
              alt="Profile" 
              className="avatar-image"
            />
          ) : (
            <UserIcon size={48} />
          )}
        </div>
        <div className="profile-details">
          <h2 className="profile-name">{userProfile?.nickname || userProfile?.name || 'User'}</h2>
          <p className="profile-email">{userProfile?.email}</p>
          <span className="profile-role">{userRole === 'primary' ? 'Primary User' : 'Partner'}</span>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="settings-grid">
        
        {/* Profile Information Card */}
        <div className="settings-section">
          <h3 className="section-title">Profile Information</h3>
          <div className="profile-info-list">
            <div className="info-row">
              <span className="info-label">Nickname</span>
              <div className="info-value-group">
                <span className="info-value">{userProfile?.nickname || 'Not set'}</span>
                <EditIcon 
                  size={16} 
                  onClick={() => setShowEditProfile(true)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{userProfile?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Role</span>
              <span className="info-value">{userRole === 'primary' ? 'Primary User' : 'Partner'}</span>
            </div>
          </div>
        </div>

        {/* Cycle Settings - Only for primary users */}
        {userRole === 'primary' && (
          <div className="settings-section">
            <h3 className="section-title">Cycle Settings</h3>
            <div className="cycle-info">
              <div className="cycle-stat">
                <span className="stat-value">{editedCycle.cycleLength}</span>
                <span className="stat-label">Cycle Days</span>
              </div>
              <div className="cycle-stat">
                <span className="stat-value">{editedCycle.periodLength}</span>
                <span className="stat-label">Period Days</span>
              </div>
              <EditIcon 
                size={16}
                onClick={() => setShowEditCycle(true)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        )}

        {/* Partner Connection */}
        <div className="settings-section">
          <h3 className="section-title">Partner Connection</h3>
          {partnerConnected ? (
            <div className="partner-status">
              <div className="status-dot"></div>
              <span className="partner-name">{partnerName}</span>
              <EditIcon 
                size={16}
                onClick={() => setShowPartnerActions(true)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ) : (
            <div className="partner-actions">
              {/* Primary users can only generate codes */}
              {userRole === 'primary' ? (
                <>
                  <button 
                    className="action-btn primary"
                    onClick={handleGenerateInviteCode}
                    disabled={isGeneratingCode}
                  >
                    {isGeneratingCode ? 'Generating...' : 'Generate Invite Code'}
                  </button>
                  
                  {inviteCode && (
                    <div className="invite-code">
                      <div className="code-content">
                        <span className="code-display">{inviteCode}</span>
                        <span className="code-timer">
                          {Math.floor(codeTimeLeft / 60)}:{(codeTimeLeft % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <button 
                        className="copy-btn"
                        onClick={handleCopyCode}
                        title="Copy invite code"
                      >
                        <CopyIcon size={16} />
                      </button>
                    </div>
                  )}
                  
                  <div className="primary-helper">
                    <p className="helper-text">
                      Share this code with your partner so they can connect to your account.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Partners can only enter codes */}
                  <div className="connect-section">
                    <input
                      type="text"
                      placeholder="Enter invite code"
                      value={connectCode}
                      onChange={(e) => setConnectCode(e.target.value.toUpperCase())}
                      maxLength="6"
                      className="code-input"
                    />
                    <button 
                      className="action-btn secondary"
                      onClick={handleConnectPartner}
                      disabled={connectCode.length !== 6}
                    >
                      Connect
                    </button>
                  </div>
                  
                  <div className="partner-helper">
                    <p className="helper-text">
                      Ask your partner to generate an invite code and share it with you.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Security & Account Actions */}
        <div className="settings-section full-width">
          <h3 className="section-title">Security & Account</h3>
          <div className="action-grid">
            <button 
              className="action-btn secondary"
              onClick={handleChangePIN}
            >
              <LockIcon size={16} />
              Change PIN
            </button>
            
            <button 
              className="action-btn secondary"
              onClick={handleNotifications}
            >
              <NotificationIcon size={16} />
              Notifications
            </button>
            
            <button 
              className="action-btn secondary"
              onClick={() => setShowResetConfirm(true)}
            >
              <RefreshIcon size={16} />
              Reset Account
            </button>
            
            <button 
              className="action-btn secondary"
              onClick={() => setShowSignOutConfirm(true)}
            >
              <LogOutIcon size={16} />
              Sign Out
            </button>
            
            <button 
              className="action-btn secondary"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <DeleteIcon size={16} />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>
            <div className="input-group">
              <label>Nickname</label>
              <input
                type="text"
                value={editedProfile.nickname}
                onChange={(e) => setEditedProfile(prev => ({...prev, nickname: e.target.value}))}
                placeholder="Enter nickname"
                maxLength="20"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={() => setShowEditProfile(false)}>Cancel</button>
              <button className="primary" onClick={handleSaveProfile}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Cycle Modal */}
      {showEditCycle && (
        <div className="modal-overlay" onClick={() => setShowEditCycle(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Cycle Settings</h3>
            <div className="cycle-inputs">
              <div className="input-group">
                <label>Cycle Length</label>
                <input
                  type="number"
                  min="21"
                  max="35"
                  value={editedCycle.cycleLength}
                  onChange={(e) => setEditedCycle(prev => ({...prev, cycleLength: parseInt(e.target.value)}))}
                />
                <span>days</span>
              </div>
              <div className="input-group">
                <label>Period Length</label>
                <input
                  type="number"
                  min="3"
                  max="8"
                  value={editedCycle.periodLength}
                  onChange={(e) => setEditedCycle(prev => ({...prev, periodLength: parseInt(e.target.value)}))}
                />
                <span>days</span>
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={() => setShowEditCycle(false)}>Cancel</button>
              <button className="primary" onClick={handleSaveCycle}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Partner Actions Modal */}
      {showPartnerActions && (
        <div className="modal-overlay" onClick={() => setShowPartnerActions(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Partner Actions</h3>
            <p>Connected to {partnerName}</p>
            <div className="modal-buttons">
              <button onClick={() => setShowPartnerActions(false)}>Cancel</button>
              <button className="danger" onClick={handleDisconnectPartner}>Disconnect</button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="modal-overlay" onClick={() => setShowSignOutConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Sign Out</h3>
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowSignOutConfirm(false)}>Cancel</button>
              <button className="warning" onClick={onSignOut}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Account Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Account</h3>
            <p>⚠️ This will reset all your account data but keep your login:</p>
            <ul className="reset-warning-list">
              <li>All cycle tracking data will be cleared</li>
              <li>Partner connections will be removed</li>
              <li>Chat history will be deleted</li>
              <li>You'll need to complete setup again</li>
            </ul>
            <p><strong>Your account login will remain active.</strong></p>
            <div className="modal-buttons">
              <button onClick={() => setShowResetConfirm(false)}>Cancel</button>
              <button className="warning" onClick={handleResetAccount}>
                Yes, Reset My Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Account</h3>
            <p>⚠️ This action cannot be undone. All your data will be permanently deleted:</p>
            <ul className="delete-warning-list">
              <li>Your profile information</li>
              <li>All cycle tracking data</li>
              <li>Partner connections</li>
              <li>App settings and preferences</li>
            </ul>
            <p>Are you sure you want to delete your account?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="danger" onClick={handleDeleteAccount}>
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Built with Love Message */}
      <div className="love-message">
        <SmallHeartIcon size={14} color="#e91e63" />
        <span>Built with Love for Partner</span>
      </div>
    </div>
  );
}

export default Settings;