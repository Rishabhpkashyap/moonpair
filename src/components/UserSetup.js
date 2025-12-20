import React, { useState } from 'react';
import { MoonIcon, FemaleIcon, MaleIcon } from './Icons';
import './UserSetup.css';

function UserSetup({ onComplete, theme }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    gender: '',
    lastPeriodStart: '',
    lastPeriodEnd: '',
    cycleLength: 28,
    periodLength: 5
  });
  const [error, setError] = useState('');

  const handleNext = () => {
    setError('');
    
    if (step === 1) {
      if (!formData.nickname.trim()) {
        setError('Please enter a nickname');
        return;
      }
      if (!formData.gender) {
        setError('Please select your gender');
        return;
      }
      if (formData.gender === 'female') {
        setStep(2); // Ask for period data
      } else {
        // Male users skip period data
        completeSetup();
      }
    } else if (step === 2) {
      if (!formData.lastPeriodStart) {
        setError('Please select your last period start date');
        return;
      }
      completeSetup();
    }
  };

  const completeSetup = () => {
    const userRole = formData.gender === 'female' ? 'primary' : 'partner';
    
    const setupData = {
      nickname: formData.nickname.trim(),
      gender: formData.gender,
      userRole,
      cycleData: formData.gender === 'female' ? {
        cycleLength: formData.cycleLength,
        periodLength: formData.periodLength,
        lastPeriodStart: formData.lastPeriodStart || null,
        lastPeriodEnd: formData.lastPeriodEnd || null,
        history: formData.lastPeriodStart ? [{
          startDate: formData.lastPeriodStart,
          endDate: formData.lastPeriodEnd || null
        }] : []
      } : null
    };

    onComplete(setupData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const canProceed = () => {
    if (step === 1) return formData.nickname.trim() && formData.gender;
    if (step === 2) return formData.lastPeriodStart;
    return false;
  };

  const totalSteps = formData.gender === 'female' ? 2 : 1;

  return (
    <div className={`user-setup ${theme}`}>
      <div className="setup-container">
        <div className="setup-header">
          <MoonIcon size={64} />
          <h1>Welcome to MoonPair</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
          <p>Step {step} of {totalSteps}</p>
        </div>

        <div className="setup-content">
          {step === 1 && (
            <div className="setup-step">
              <h2>Tell us about yourself</h2>
              
              <div className="input-group">
                <label>Choose a nickname</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  placeholder="Enter your nickname"
                  maxLength="20"
                  className="setup-input"
                />
                <p className="input-hint">This will be shown to your partner</p>
              </div>

              <div className="input-group">
                <label>Your gender</label>
                <div className="gender-options">
                  <button
                    type="button"
                    className={`gender-btn ${formData.gender === 'female' ? 'selected' : ''}`}
                    onClick={() => handleInputChange('gender', 'female')}
                  >
                    <FemaleIcon selected={formData.gender === 'female'} />
                    <span>Female</span>
                    <span className="role-hint">Primary User</span>
                  </button>
                  
                  <button
                    type="button"
                    className={`gender-btn ${formData.gender === 'male' ? 'selected' : ''}`}
                    onClick={() => handleInputChange('gender', 'male')}
                  >
                    <MaleIcon selected={formData.gender === 'male'} />
                    <span>Male</span>
                    <span className="role-hint">Partner</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && formData.gender === 'female' && (
            <div className="setup-step">
              <h2>Period Information</h2>
              <p>Help us track your cycle from the start</p>
              
              <div className="period-dates">
                <div className="input-group">
                  <label>Last period start date</label>
                  <input
                    type="date"
                    value={formData.lastPeriodStart}
                    onChange={(e) => handleInputChange('lastPeriodStart', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="setup-input"
                  />
                </div>

                <div className="input-group">
                  <label>Last period end date (optional)</label>
                  <input
                    type="date"
                    value={formData.lastPeriodEnd}
                    onChange={(e) => handleInputChange('lastPeriodEnd', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    min={formData.lastPeriodStart}
                    className="setup-input"
                  />
                </div>
              </div>

              <div className="cycle-inputs">
                <div className="input-group">
                  <label>Typical cycle length</label>
                  <div className="number-input">
                    <input
                      type="number"
                      min="21"
                      max="35"
                      value={formData.cycleLength}
                      onChange={(e) => handleInputChange('cycleLength', parseInt(e.target.value))}
                      className="setup-input-small"
                    />
                    <span>days</span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Typical period length</label>
                  <div className="number-input">
                    <input
                      type="number"
                      min="3"
                      max="8"
                      value={formData.periodLength}
                      onChange={(e) => handleInputChange('periodLength', parseInt(e.target.value))}
                      className="setup-input-small"
                    />
                    <span>days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && <div className="setup-error">{error}</div>}

          <div className="setup-actions">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="continue-btn"
            >
              {step === totalSteps ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>

        {step === 1 && (
          <div className="setup-info">
            <div className="info-item">
              <strong>👩 Female:</strong>
              <p>Track periods and manage cycle data</p>
            </div>
            <div className="info-item">
              <strong>👨 Male:</strong>
              <p>View cycle information and chat</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSetup;