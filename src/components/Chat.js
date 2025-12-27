import React, { useState, useEffect, useRef } from 'react';
import { ref, onValue, push, get } from 'firebase/database';
import { database } from '../firebase';
import { SendIcon, MessageCircleIcon, UsersIcon, HeartIcon } from './Icons';
import notificationManager from '../utils/notifications';
import './Chat.css';

function Chat({ userId, userRole, theme, onMessagesRead, activeTab }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partnerName, setPartnerName] = useState('Partner');
  const [partnerId, setPartnerId] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);
  const [partnerPhotoURL, setPartnerPhotoURL] = useState(null);
  const [userNickname, setUserNickname] = useState('You');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!database) {
      console.warn('Firebase database not available');
      return;
    }

    // Load current user profile
    const loadUserProfile = async () => {
      try {
        const userSnapshot = await get(ref(database, `users/${userId}/profile`));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUserPhotoURL(userData.photoURL || null);
          setUserNickname(userData.nickname || userData.name || 'You');
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();

    // Get partner info from the new partner connection structure
    const userRef = ref(database, `users/${userId}/partner`);
    const unsubscribe = onValue(userRef, async (snapshot) => {
      const partnerData = snapshot.val();
      if (partnerData && partnerData.partnerId) {
        setPartnerId(partnerData.partnerId);
        setPartnerName(partnerData.partnerName || partnerData.partnerEmail || 'Partner');
        
        // Load partner profile picture
        try {
          const partnerSnapshot = await get(ref(database, `users/${partnerData.partnerId}/profile`));
          if (partnerSnapshot.exists()) {
            const partnerProfile = partnerSnapshot.val();
            setPartnerPhotoURL(partnerProfile.photoURL || null);
          }
        } catch (error) {
          console.error('Error loading partner profile:', error);
        }
      } else {
        // Check localStorage as fallback
        const localPartnerData = localStorage.getItem('partnerData');
        if (localPartnerData) {
          const partner = JSON.parse(localPartnerData);
          setPartnerId(partner.partnerId);
          setPartnerName(partner.partnerName || partner.partnerEmail || 'Partner');
        } else {
          setPartnerId(null);
          setPartnerName('Partner');
          setPartnerPhotoURL(null);
        }
      }
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (partnerId && database) {
      const chatId = [userId, partnerId].sort().join('_');
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.entries(data).map(([id, message]) => ({
            id,
            ...message
          })).sort((a, b) => a.timestamp - b.timestamp);
          
          // Check for new messages from partner
          const previousMessages = messages;
          const newMessages = messageList.filter(msg => 
            !previousMessages.find(prevMsg => prevMsg.id === msg.id) &&
            msg.senderId === partnerId
          );
          
          // Show notifications for new messages
          newMessages.forEach(message => {
            if (notificationManager.shouldShowNotification(activeTab, message.senderId, userId)) {
              notificationManager.showChatNotification(
                partnerName,
                message.text,
                {
                  icon: partnerPhotoURL || '/favicon.ico'
                }
              );
            }
          });
          
          setMessages(messageList);
          
          // Mark messages as read when component is active
          localStorage.setItem(`lastChatVisit_${chatId}`, Date.now().toString());
          if (onMessagesRead) onMessagesRead();
        } else {
          setMessages([]);
        }
      });

      return () => unsubscribe();
    }
  }, [userId, partnerId, onMessagesRead, activeTab, messages, partnerName, partnerPhotoURL]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !partnerId || !database) {
      if (!database) {
        console.warn('Firebase not available, cannot send message');
      }
      return;
    }

    try {
      const chatId = [userId, partnerId].sort().join('_');
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      
      await push(messagesRef, {
        text: newMessage.trim(),
        senderId: userId,
        timestamp: Date.now(),
        status: 'sent'
      });

      // Update chat metadata
      const chatMetaRef = ref(database, `chats/${chatId}/metadata`);
      await push(chatMetaRef, {
        lastMessage: newMessage.trim(),
        lastMessageTime: Date.now(),
        lastMessageSender: userId
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (!partnerId) {
    return (
      <div className={`chat ${theme}`}>
        <div className="chat-header">
          <MessageCircleIcon size={24} />
          <h2>Partner Chat</h2>
        </div>
        <div className="no-partner">
          <div className="no-partner-icon">
            <UsersIcon size={64} color={theme === 'dark' ? '#999' : '#666'} />
          </div>
          <h3>No Partner Connected</h3>
          <p>
            {userRole === 'primary' 
              ? 'Generate an invite code in Settings and share it with your partner to start chatting.'
              : 'Ask your partner to generate an invite code and enter it in Settings to start chatting.'
            }
          </p>
          <div className="connect-hint">
            <p>Go to Settings → Partner Connection</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat ${theme}`}>
      <div className="chat-header">
        <MessageCircleIcon size={24} />
        <h2>{partnerName}</h2>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">
              <HeartIcon size={64} color={theme === 'dark' ? '#999' : '#666'} />
            </div>
            <p>Start your conversation with {partnerName}</p>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.senderId === userId;
            const profilePhoto = isCurrentUser ? userPhotoURL : partnerPhotoURL;
            const senderName = isCurrentUser ? userNickname : partnerName;
            
            return (
              <div 
                key={message.id} 
                className={`message ${isCurrentUser ? 'sent' : 'received'}`}
              >
                <div className="message-avatar">
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt={senderName} 
                      className="avatar-image"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {senderName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        <div className="message-input">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            rows="1"
          />
          <button 
            onClick={sendMessage} 
            disabled={!newMessage.trim()}
            className="send-button"
          >
            <SendIcon theme={theme} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;