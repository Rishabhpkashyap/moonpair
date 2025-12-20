// Notification utility for handling push notifications

class NotificationManager {
  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  // Check if notifications are supported
  isNotificationSupported() {
    return this.isSupported;
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Notifications not supported');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Show a local notification (fallback)
  showLocalNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      return null;
    }

    const defaultOptions = {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'chat-message',
      requireInteraction: false,
      silent: false
    };

    return new Notification(title, { ...defaultOptions, ...options });
  }

  // Register service worker for push notifications
  async registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered:', registration);
      
      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', this.handleServiceWorkerMessage);
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  // Handle messages from service worker
  handleServiceWorkerMessage = (event) => {
    if (event.data && event.data.type === 'NAVIGATE_TO_CHAT') {
      // Dispatch custom event to navigate to chat
      window.dispatchEvent(new CustomEvent('navigateToChat', {
        detail: event.data.data
      }));
    }
  }

  // Show notification for new chat message
  showChatNotification(senderName, messageText, options = {}) {
    const title = `${senderName} sent a message`;
    const body = messageText.length > 50 ? messageText.substring(0, 50) + '...' : messageText;
    
    const notificationOptions = {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'chat-message',
      requireInteraction: false,
      silent: false,
      data: {
        type: 'chat',
        sender: senderName,
        message: messageText,
        timestamp: Date.now()
      },
      ...options
    };

    // Try to show via service worker first, fallback to local notification
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title,
        options: notificationOptions
      });
    } else {
      this.showLocalNotification(title, notificationOptions);
    }
  }

  // Check if app is in background/hidden
  isAppInBackground() {
    return document.hidden || document.visibilityState === 'hidden';
  }

  // Check if user is currently on chat tab
  isOnChatTab(activeTab) {
    return activeTab === 'chat';
  }

  // Determine if notification should be shown
  shouldShowNotification(activeTab, senderId, currentUserId) {
    // Don't show notification for own messages
    if (senderId === currentUserId) {
      return false;
    }

    // Show notification if app is in background
    if (this.isAppInBackground()) {
      return true;
    }

    // Show notification if user is not on chat tab
    if (!this.isOnChatTab(activeTab)) {
      return true;
    }

    return false;
  }
}

// Create singleton instance
const notificationManager = new NotificationManager();

export default notificationManager;