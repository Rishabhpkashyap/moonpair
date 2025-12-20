import React, { useState, useEffect } from 'react';
import { ref, onValue, set, get } from 'firebase/database';
import { database } from '../firebase';
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths, addMonths } from 'date-fns';
import { HeartIcon, DropletIcon, FilledDropletIcon, ChevronLeftIcon, ChevronRightIcon, AlertTriangleIcon, CheckCircleIcon, ClockAlertIcon, LeafIcon, PendingIcon } from './Icons';
import './Home.css';

function Home({ userId, userRole, theme }) {
  const [cycleData, setCycleData] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('Normal');
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [userNickname, setUserNickname] = useState('');
  const [partnerNickname, setPartnerNickname] = useState('');
  const [partnerId, setPartnerId] = useState(null);
  const [partnerPhotoURL, setPartnerPhotoURL] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [allCycleHistory, setAllCycleHistory] = useState([]);

  useEffect(() => {
    if (!database) {
      console.warn('Firebase database not available');
      setCycleData({
        cycleLength: 28,
        periodLength: 5,
        lastPeriodStart: null,
        lastPeriodEnd: null,
        history: []
      });
      return;
    }

    // Load user profile and partner info
    const userRef = ref(database, `users/${userId}`);
    const unsubscribeUser = onValue(userRef, async (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setUserNickname(userData.profile?.nickname || userData.profile?.name || 'You');
        setUserPhotoURL(userData.profile?.photoURL || null);
        
        // Check for partner connection
        if (userData.partner && userData.partner.partnerId) {
          setPartnerId(userData.partner.partnerId);
          setPartnerNickname(userData.partner.partnerName || 'Partner');
          
          // Load partner profile photo
          try {
            const partnerSnapshot = await get(ref(database, `users/${userData.partner.partnerId}/profile`));
            if (partnerSnapshot.exists()) {
              const partnerData = partnerSnapshot.val();
              setPartnerPhotoURL(partnerData.photoURL || null);
            }
          } catch (error) {
            console.error('Error loading partner profile:', error);
          }
        } else {
          setPartnerNickname('');
          setPartnerId(null);
          setPartnerPhotoURL(null);
        }
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, [userId]);

  // Separate effect for loading cycle data based on user role and partner info
  useEffect(() => {
    if (!database) return;

    // Determine whose cycle data to load
    let cycleDataUserId = userId; // Default to current user
    
    // If current user is a partner and has a partner ID, get cycle data from primary user
    if (userRole === 'partner' && partnerId) {
      cycleDataUserId = partnerId;
      console.log('Partner loading cycle data from primary user:', partnerId);
    } else if (userRole === 'primary') {
      console.log('Primary user loading own cycle data:', userId);
    }
    
    // Load cycle data
    const cycleRef = ref(database, `users/${cycleDataUserId}/cycle`);
    const unsubscribeCycle = onValue(cycleRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Cycle data loaded for user:', cycleDataUserId, data);
      
      if (data) {
        setCycleData(data);
        setAllCycleHistory(data.history || []);
        calculatePhase(data);
      } else {
        console.log('No cycle data found, using defaults');
        setCycleData({
          cycleLength: 28,
          periodLength: 5,
          lastPeriodStart: null,
          lastPeriodEnd: null,
          history: []
        });
        setAllCycleHistory([]);
        setCurrentPhase('Normal');
      }
    });

    return () => {
      unsubscribeCycle();
    };
  }, [userId, userRole, partnerId]);

  const calculatePhase = (data) => {
    if (!data.lastPeriodStart) {
      setCurrentPhase('Normal');
      return;
    }

    const lastStart = new Date(data.lastPeriodStart);
    const today = new Date();
    const daysSinceStart = differenceInDays(today, lastStart);
    const periodLength = data.periodLength || 5;

    if (daysSinceStart < periodLength && !data.lastPeriodEnd) {
      setCurrentPhase('Period');
    } else if (daysSinceStart >= 12 && daysSinceStart <= 16) {
      setCurrentPhase('Ovulation');
    } else {
      setCurrentPhase('Normal');
    }
  };

  const getExpectedPeriodDate = () => {
    if (!cycleData || !cycleData.lastPeriodStart) return null;
    
    const lastStart = new Date(cycleData.lastPeriodStart);
    const cycleLength = cycleData.cycleLength || 28;
    const expectedDate = addDays(lastStart, cycleLength);
    
    return expectedDate;
  };

  const getPeriodStatus = () => {
    if (!cycleData || !cycleData.lastPeriodStart) return null;
    
    const expectedDate = getExpectedPeriodDate();
    if (!expectedDate) return null;
    
    const today = new Date();
    const daysDifference = differenceInDays(today, expectedDate);
    
    if (daysDifference > 0) {
      // Period is late
      return {
        status: 'late',
        days: daysDifference,
        message: `Period Late`,
        subMessage: `${daysDifference} day${daysDifference > 1 ? 's' : ''} overdue`
      };
    } else if (daysDifference === 0) {
      // Period expected today
      return {
        status: 'today',
        days: 0,
        message: 'Period Expected',
        subMessage: 'Today'
      };
    } else {
      // Period is upcoming
      const daysRemaining = Math.abs(daysDifference);
      return {
        status: 'upcoming',
        days: daysRemaining,
        message: 'Next Period',
        subMessage: `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} remaining`
      };
    }
  };

  const handlePeriodStart = () => {
    setShowDatePicker('start');
  };

  const handlePeriodEnd = () => {
    setShowDatePicker('end');
  };

  const confirmDate = () => {
    if (!database) {
      console.warn('Firebase not available, using local storage');
      setShowDatePicker(null);
      return;
    }

    if (showDatePicker === 'start') {
      const newHistory = cycleData.history || [];
      newHistory.push({
        startDate: selectedDate,
        endDate: null
      });

      set(ref(database, `users/${userId}/cycle`), {
        ...cycleData,
        lastPeriodStart: selectedDate,
        lastPeriodEnd: null,
        history: newHistory
      });
    } else if (showDatePicker === 'end') {
      const updatedHistory = [...(cycleData.history || [])];
      if (updatedHistory.length > 0) {
        updatedHistory[updatedHistory.length - 1].endDate = selectedDate;
      }

      set(ref(database, `users/${userId}/cycle`), {
        ...cycleData,
        lastPeriodEnd: selectedDate,
        history: updatedHistory
      });
    }
    setShowDatePicker(null);
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'Period': return <DropletIcon size={24} color="#FF6B9D" />;
      case 'PMS': return <span className="phase-emoji">😔</span>;
      case 'Ovulation': return <span className="phase-emoji">🌸</span>;
      default: return <span className="phase-emoji">✨</span>;
    }
  };

  const getDayPhase = (day) => {
    if (!cycleData || !cycleData.lastPeriodStart) return null;

    const lastStart = new Date(cycleData.lastPeriodStart);
    const daysSinceStart = differenceInDays(day, lastStart);
    const periodLength = cycleData.periodLength || 5;
    const cycleLength = cycleData.cycleLength || 28;
    const today = new Date();

    // Check historical data first
    for (const period of allCycleHistory) {
      if (period.startDate) {
        const periodStart = new Date(period.startDate);
        const periodEnd = period.endDate ? new Date(period.endDate) : addDays(periodStart, periodLength - 1);
        
        if (day >= periodStart && day <= periodEnd) {
          return 'period';
        }
      }
    }

    // Current cycle calculations
    if (daysSinceStart >= 0 && daysSinceStart < periodLength) {
      return 'period';
    } else if (daysSinceStart >= 12 && daysSinceStart <= 16) {
      return 'ovulation';
    }

    // Fertility window (days 10-17 of cycle, excluding ovulation days)
    if ((daysSinceStart >= 10 && daysSinceStart < 12) || (daysSinceStart > 16 && daysSinceStart <= 17)) {
      return 'fertility';
    }

    // Check for expected period date (next cycle start)
    const expectedNextPeriod = addDays(lastStart, cycleLength);
    if (isSameDay(day, expectedNextPeriod)) {
      return 'expected-period';
    }

    // Check for delay days (period is late) with progressive intensity
    if (day > expectedNextPeriod && day <= today) {
      const delayDays = differenceInDays(day, expectedNextPeriod);
      return `delay-${delayDays}`;
    }

    return 'normal';
  };

  const getDelayColor = (delayDays) => {
    // Progressive color intensity based on delay days
    if (delayDays <= 1) return '#FDE68A'; // Very light yellow
    if (delayDays <= 2) return '#FCD34D'; // Light yellow
    if (delayDays <= 3) return '#F59E0B'; // Medium orange
    if (delayDays <= 4) return '#D97706'; // Darker orange
    if (delayDays <= 5) return '#B45309'; // Dark orange
    return '#92400E'; // Very dark orange/brown for 6+ days
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const today = new Date();

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button 
            className="nav-btn"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeftIcon size={20} />
          </button>
          <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
          <button 
            className="nav-btn"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
        <div className="calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`day-label-${index}`} className="calendar-day-label">{day}</div>
          ))}
          {days.map(day => {
            const phase = getDayPhase(day);
            const isToday = isSameDay(day, today);

            return (
              <div 
                key={day.toString()} 
                className={`calendar-day ${isToday ? 'today' : ''} ${phase ? phase : ''}`}
              >
                <span className="day-number">{format(day, 'd')}</span>
                {phase && phase !== 'normal' && (
                  <div className="phase-indicator">
                    {phase === 'period' && <FilledDropletIcon size={14} color="#FF0000" />}
                    {phase === 'ovulation' && <span className="phase-emoji-small">🌸</span>}
                    {phase === 'fertility' && <LeafIcon size={14} color="#10B981" />}
                    {phase === 'expected-period' && <DropletIcon size={14} color="#FFB5E8" />}
                    {phase && phase.startsWith('delay-') && (
                      <PendingIcon 
                        size={14} 
                        color={getDelayColor(parseInt(phase.split('-')[1]))} 
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Phase Legend */}
        <div className="phase-legend">
          <div className="legend-item">
            <FilledDropletIcon size={16} color="#FF0000" />
            <span>Period</span>
          </div>
          <div className="legend-item">
            <span className="phase-emoji-legend">🌸</span>
            <span>Ovulation</span>
          </div>
          <div className="legend-item">
            <LeafIcon size={16} color="#10B981" />
            <span>Fertility Window</span>
          </div>
          <div className="legend-item">
            <DropletIcon size={16} color="#FFB5E8" />
            <span>Expected Period</span>
          </div>
          <div className="legend-item delay-legend">
            <div className="delay-examples">
              <PendingIcon size={12} color="#FDE68A" />
              <PendingIcon size={12} color="#F59E0B" />
              <PendingIcon size={12} color="#92400E" />
            </div>
            <span>Delay Days</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`home ${theme}`}>
      {/* Partner Connection Header */}
      {partnerId ? (
        <div className="partner-header">
          <div className="partner-photos">
            <div className="photo-container">
              {userPhotoURL ? (
                <img src={userPhotoURL} alt={userNickname} className="partner-photo" />
              ) : (
                <div className="photo-placeholder">{userNickname.charAt(0)}</div>
              )}
            </div>
            <div className="heart-connector">
              <HeartIcon size={32} color="#FF69B4" />
            </div>
            <div className="photo-container">
              {partnerPhotoURL ? (
                <img src={partnerPhotoURL} alt={partnerNickname} className="partner-photo" />
              ) : (
                <div className="photo-placeholder">{partnerNickname.charAt(0)}</div>
              )}
            </div>
          </div>
          <div className="partner-names">
            <h2>{userNickname} & {partnerNickname}</h2>
          </div>
        </div>
      ) : (
        <div className="single-header">
          <div className="single-photo">
            {userPhotoURL ? (
              <img src={userPhotoURL} alt={userNickname} className="user-photo" />
            ) : (
              <div className="photo-placeholder large">{userNickname.charAt(0)}</div>
            )}
          </div>
          <h2>{userNickname}</h2>
        </div>
      )}

      {/* Modern Phase Card */}
      <div className="phase-card-modern">
        <div className="phase-main">
          <div className="phase-icon-wrapper">
            {getPhaseIcon(currentPhase)}
          </div>
          <div className="phase-content">
            <div className="phase-label">Current Phase</div>
            <div className="phase-name-large">{currentPhase}</div>
          </div>
        </div>
        
        {(() => {
          const periodStatus = getPeriodStatus();
          const expectedDate = getExpectedPeriodDate();
          
          if (!periodStatus || !expectedDate) return null;
          
          return (
            <div className="period-info-card">
              <div className="period-info-header">
                <div className="period-status-icon">
                  {periodStatus.status === 'late' && <AlertTriangleIcon size={20} color="#FF6B35" />}
                  {periodStatus.status === 'today' && <CheckCircleIcon size={20} color="#10B981" />}
                  {periodStatus.status === 'upcoming' && <ClockAlertIcon size={20} color="#F59E0B" />}
                </div>
                <div className="period-info-text">
                  <div className="period-title">{periodStatus.message}</div>
                  <div className="period-date">{format(expectedDate, 'MMM do')}</div>
                </div>
              </div>
              <div className="period-countdown">
                <span className={`countdown-badge ${periodStatus.status}`}>
                  {periodStatus.subMessage}
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Calendar with Historical Data */}
      {renderCalendar()}

      {/* Action Buttons for Primary User */}
      {userRole === 'primary' && (
        <div className="action-buttons">
          <button className="action-btn start" onClick={handlePeriodStart}>
            <DropletIcon size={20} color="white" />
            Period Started
          </button>
          <button className="action-btn end" onClick={handlePeriodEnd}>
            <DropletIcon size={20} color="white" />
            Period Ended
          </button>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="modal-overlay" onClick={() => setShowDatePicker(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{showDatePicker === 'start' ? 'Period Start Date' : 'Period End Date'}</h3>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={format(new Date(), 'yyyy-MM-dd')}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowDatePicker(null)}>Cancel</button>
              <button onClick={confirmDate} className="confirm">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
