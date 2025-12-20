import React from 'react';
import { database } from '../firebase';

function FirebaseStatus({ theme }) {
  const isConnected = database !== null;

  if (isConnected) return null; // Don't show anything if Firebase is working

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#ff9800',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      ⚠️ Firebase Offline - Using Local Storage
    </div>
  );
}

export default FirebaseStatus;