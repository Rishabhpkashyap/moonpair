import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { differenceInDays, parseISO } from 'date-fns';
import { 
  ChartIcon, 
  RefreshIcon, 
  DropletIcon, 
  TrendUpIcon, 
  ClockIcon, 
  TimerIcon, 
  RulerIcon, 
  BarChartIcon,
  CalendarIcon 
} from './Icons';
import './Analytics.css';

function Analytics({ userId, userRole, theme }) {
  const [cycleData, setCycleData] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const [analytics, setAnalytics] = useState({
    averageCycleLength: 0,
    averagePeriodLength: 0,
    totalCycles: 0,
    earlyCycles: 0,
    lateCycles: 0,
    longestCycle: 0,
    shortestCycle: 0
  });

  useEffect(() => {
    if (!database) {
      console.warn('Firebase database not available');
      return;
    }

    // First, get partner info if user is a partner
    const userRef = ref(database, `users/${userId}`);
    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.partner && userData.partner.partnerId) {
        setPartnerId(userData.partner.partnerId);
      } else {
        setPartnerId(null);
      }
    });

    return () => unsubscribeUser();
  }, [userId]);

  useEffect(() => {
    if (!database) return;

    // Determine whose cycle data to load
    let cycleDataUserId = userId; // Default to current user
    
    // If current user is a partner and has a partner ID, get cycle data from primary user
    if (userRole === 'partner' && partnerId) {
      cycleDataUserId = partnerId;
      console.log('Partner loading analytics from primary user:', partnerId);
    } else if (userRole === 'primary') {
      console.log('Primary user loading own analytics:', userId);
    }

    const cycleRef = ref(database, `users/${cycleDataUserId}/cycle`);
    const unsubscribe = onValue(cycleRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Analytics data loaded for user:', cycleDataUserId, data);
      
      if (data) {
        setCycleData(data);
        calculateAnalytics(data);
      } else {
        setCycleData(null);
        setAnalytics({
          averageCycleLength: 0,
          averagePeriodLength: 0,
          totalCycles: 0,
          earlyCycles: 0,
          lateCycles: 0,
          longestCycle: 0,
          shortestCycle: 0
        });
      }
    });

    return () => unsubscribe();
  }, [userId, userRole, partnerId, database]);

  const calculateAnalytics = (data) => {
    if (!data.history || data.history.length === 0) {
      setAnalytics({
        averageCycleLength: 0,
        averagePeriodLength: 0,
        totalCycles: 0,
        earlyCycles: 0,
        lateCycles: 0,
        longestCycle: 0,
        shortestCycle: 0
      });
      return;
    }

    const history = data.history.filter(cycle => cycle.startDate);
    const totalCycles = history.length;
    
    if (totalCycles === 0) return;

    // Calculate cycle lengths
    const cycleLengths = [];
    for (let i = 1; i < history.length; i++) {
      const prevStart = parseISO(history[i-1].startDate);
      const currentStart = parseISO(history[i].startDate);
      const cycleLength = differenceInDays(currentStart, prevStart);
      if (cycleLength > 0) {
        cycleLengths.push(cycleLength);
      }
    }

    // Calculate period lengths
    const periodLengths = history
      .filter(cycle => cycle.endDate)
      .map(cycle => {
        const start = parseISO(cycle.startDate);
        const end = parseISO(cycle.endDate);
        return differenceInDays(end, start) + 1;
      });

    const averageCycleLength = cycleLengths.length > 0 
      ? Math.round(cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length)
      : data.cycleLength || 28;

    const averagePeriodLength = periodLengths.length > 0
      ? Math.round(periodLengths.reduce((sum, length) => sum + length, 0) / periodLengths.length)
      : data.periodLength || 5;

    const expectedCycleLength = data.cycleLength || 28;
    const earlyCycles = cycleLengths.filter(length => length < expectedCycleLength - 2).length;
    const lateCycles = cycleLengths.filter(length => length > expectedCycleLength + 2).length;

    const longestCycle = cycleLengths.length > 0 ? Math.max(...cycleLengths) : 0;
    const shortestCycle = cycleLengths.length > 0 ? Math.min(...cycleLengths) : 0;

    setAnalytics({
      averageCycleLength,
      averagePeriodLength,
      totalCycles,
      earlyCycles,
      lateCycles,
      longestCycle,
      shortestCycle
    });
  };

  const StatCard = ({ title, value, unit, icon }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">
          {value} <span className="stat-unit">{unit}</span>
        </div>
      </div>
    </div>
  );

  const CycleHistoryItem = ({ cycle, index }) => {
    const startDate = new Date(cycle.startDate);
    const endDate = cycle.endDate ? new Date(cycle.endDate) : null;
    const duration = endDate ? differenceInDays(endDate, startDate) + 1 : 'Ongoing';

    return (
      <div className="history-item">
        <div className="history-date">
          {startDate.toLocaleDateString()}
        </div>
        <div className="history-duration">
          {typeof duration === 'number' ? `${duration} days` : duration}
        </div>
      </div>
    );
  };

  return (
    <div className={`analytics ${theme}`}>
      <div className="analytics-header">
        <ChartIcon size={32} />
        <p>Your cycle patterns and insights</p>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Average Cycle" 
          value={analytics.averageCycleLength} 
          unit="days" 
          icon={<RefreshIcon />}
        />
        <StatCard 
          title="Average Period" 
          value={analytics.averagePeriodLength} 
          unit="days" 
          icon={<DropletIcon />}
        />
        <StatCard 
          title="Total Cycles" 
          value={analytics.totalCycles} 
          unit="recorded" 
          icon={<TrendUpIcon />}
        />
        <StatCard 
          title="Early Cycles" 
          value={analytics.earlyCycles} 
          unit="times" 
          icon={<ClockIcon />}
        />
        <StatCard 
          title="Late Cycles" 
          value={analytics.lateCycles} 
          unit="times" 
          icon={<TimerIcon />}
        />
        <StatCard 
          title="Longest Cycle" 
          value={analytics.longestCycle} 
          unit="days" 
          icon={<RulerIcon />}
        />
      </div>

      {cycleData && cycleData.history && cycleData.history.length > 0 && (
        <div className="cycle-history">
          <div className="history-header">
            <CalendarIcon />
            <h2>Cycle History</h2>
          </div>
          <div className="history-list">
            {cycleData.history
              .slice()
              .reverse()
              .slice(0, 10)
              .map((cycle, index) => (
                <CycleHistoryItem key={index} cycle={cycle} index={index} />
              ))}
          </div>
        </div>
      )}

      {(!cycleData || !cycleData.history || cycleData.history.length === 0) && (
        <div className="no-data">
          <div className="no-data-icon">
            <BarChartIcon size={48} />
          </div>
          <h3>No Data Yet</h3>
          <p>Start tracking your periods to see analytics and patterns</p>
        </div>
      )}
    </div>
  );
}

export default Analytics;