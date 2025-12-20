import React, { useState } from 'react';
import { PinMoonIcon } from './Icons';
import './PinLock.css';

function PinLock({ onSuccess, existingPin, theme }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          if (existingPin) {
            if (newPin === existingPin) {
              onSuccess(newPin);
            } else {
              setError('Incorrect PIN');
              setPin('');
            }
          } else {
            onSuccess(newPin);
          }
        }, 100);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError('');
    }
  };

  return (
    <div className={`pin-lock ${theme}`}>
      <div className="pin-container">
        <div className="pin-header">
          <PinMoonIcon size={64} />
          <h1>MoonPair</h1>
          <p>{existingPin ? 'Enter your PIN' : 'Set a 4-digit PIN'}</p>
          {pin.length > 0 && (
            <small className="pin-hint">Double-tap dots to clear</small>
          )}
        </div>

        <div className="pin-dots" onDoubleClick={handleBackspace}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`dot ${pin.length > i ? 'filled' : ''}`} />
          ))}
        </div>

        {error && <div className="pin-error">{error}</div>}

        <div className="pin-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button key={num} onClick={() => handleNumberClick(num.toString())}>
              {num}
            </button>
          ))}
          <button className="empty"></button>
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button className="empty"></button>
        </div>
      </div>
    </div>
  );
}

export default PinLock;
