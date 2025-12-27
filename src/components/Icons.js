import React from 'react';

export const HomeIcon = ({ active, theme }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
      stroke={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "rgba(255, 105, 180, 0.1)" : "none"}
    />
    <path 
      d="M9 22V12H15V22" 
      stroke={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChatIcon = ({ active, theme, hasNotification }) => (
  <div style={{ position: 'relative' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
        stroke={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill={active ? "rgba(255, 105, 180, 0.1)" : "none"}
      />
      <circle cx="8" cy="10" r="1" fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} />
      <circle cx="12" cy="10" r="1" fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} />
      <circle cx="16" cy="10" r="1" fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} />
    </svg>
    {hasNotification && (
      <div style={{
        position: 'absolute',
        top: '-2px',
        right: '-2px',
        width: '8px',
        height: '8px',
        backgroundColor: '#FF6B35',
        borderRadius: '50%',
        border: '2px solid #1a1a1a'
      }} />
    )}
  </div>
);

export const AnalyticsIcon = ({ active, theme }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="3" 
      y="3" 
      width="18" 
      height="18" 
      rx="2" 
      stroke={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} 
      strokeWidth="2"
      fill={active ? "rgba(255, 105, 180, 0.1)" : "none"}
    />
    <rect 
      x="7" 
      y="14" 
      width="2" 
      height="4" 
      fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")}
    />
    <rect 
      x="11" 
      y="10" 
      width="2" 
      height="8" 
      fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")}
    />
    <rect 
      x="15" 
      y="7" 
      width="2" 
      height="11" 
      fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")}
    />
    <circle 
      cx="8" 
      cy="12" 
      r="1.5" 
      fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")}
    />
    <circle 
      cx="12" 
      cy="8" 
      r="1.5" 
      fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")}
    />
    <circle 
      cx="16" 
      cy="5" 
      r="1.5" 
      fill={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")}
    />
  </svg>
);

export const SettingsIcon = ({ active, theme }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      stroke={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} 
      strokeWidth="2"
      fill={active ? "rgba(255, 105, 180, 0.1)" : "none"}
    />
    <path 
      d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2573 9.77251 19.9887C9.5799 19.7201 9.31074 19.5176 9 19.41C8.69838 19.2769 8.36381 19.2372 8.03941 19.296C7.71502 19.3548 7.41568 19.5095 7.18 19.74L7.12 19.8C6.93425 19.986 6.71368 20.1335 6.47088 20.2341C6.22808 20.3348 5.96783 20.3866 5.705 20.3866C5.44217 20.3866 5.18192 20.3348 4.93912 20.2341C4.69632 20.1335 4.47575 19.986 4.29 19.8C4.10405 19.6143 3.95653 19.3937 3.85588 19.1509C3.75523 18.9081 3.70343 18.6478 3.70343 18.385C3.70343 18.1222 3.75523 17.8619 3.85588 17.6191C3.95653 17.3763 4.10405 17.1557 4.29 16.97L4.35 16.91C4.58054 16.6743 4.73519 16.375 4.794 16.0506C4.85282 15.7262 4.81312 15.3916 4.68 15.09C4.55324 14.7942 4.34276 14.542 4.07447 14.3643C3.80618 14.1866 3.49179 14.0913 3.17 14.09H3C2.46957 14.09 1.96086 13.8793 1.58579 13.5042C1.21071 13.1291 1 12.6204 1 12.09C1 11.5596 1.21071 11.0509 1.58579 10.6758C1.96086 10.3007 2.46957 10.09 3 10.09H3.09C3.42099 10.0823 3.742 9.97512 4.01062 9.78251C4.27925 9.5899 4.48167 9.32074 4.59 9.01C4.72312 8.70838 4.76282 8.37381 4.704 8.04941C4.64519 7.72502 4.49054 7.42568 4.26 7.19L4.2 7.13C4.01405 6.94425 3.86653 6.72368 3.76588 6.48088C3.66523 6.23808 3.61343 5.97783 3.61343 5.715C3.61343 5.45217 3.66523 5.19192 3.76588 4.94912C3.86653 4.70632 4.01405 4.48575 4.2 4.3C4.38575 4.11405 4.60632 3.96653 4.84912 3.86588C5.09192 3.76523 5.35217 3.71343 5.615 3.71343C5.87783 3.71343 6.13808 3.76523 6.38088 3.86588C6.62368 3.96653 6.84425 4.11405 7.03 4.3L7.09 4.36C7.32568 4.59054 7.62502 4.74519 7.94941 4.804C8.27381 4.86282 8.60838 4.82312 8.91 4.69H9C9.29577 4.56324 9.54802 4.35276 9.72569 4.08447C9.90337 3.81618 9.99872 3.50179 10 3.18V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" 
      stroke={active ? "#FF69B4" : (theme === 'dark' ? "#999" : "#666")} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const MoonIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" 
      fill="url(#moonGradient)"
    />
    <path 
      d="M32 16C30.8954 16 30 15.1046 30 14C30 12.8954 30.8954 12 32 12C33.1046 12 34 12.8954 34 14C34 15.1046 33.1046 16 32 16Z" 
      fill="#FFE5EC"
    />
    <path 
      d="M38 26C37.4477 26 37 25.5523 37 25C37 24.4477 37.4477 24 38 24C38.5523 24 39 24.4477 39 25C39 25.5523 38.5523 26 38 26Z" 
      fill="#FFE5EC"
    />
    <path 
      d="M35 34C34.4477 34 34 33.5523 34 33C34 32.4477 34.4477 32 35 32C35.5523 32 36 32.4477 36 33C36 33.5523 35.5523 34 35 34Z" 
      fill="#FFE5EC"
    />
    <defs>
      <linearGradient id="moonGradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF69B4"/>
        <stop offset="1" stopColor="#FFB6C1"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SendIcon = ({ theme }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M22 2L11 13" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 2L15 22L11 13L2 9L22 2Z" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const FemaleIcon = ({ selected }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="8" 
      r="5" 
      stroke={selected ? "#FF69B4" : "#999"} 
      strokeWidth="2"
      fill={selected ? "rgba(255, 105, 180, 0.1)" : "none"}
    />
    <path 
      d="M12 13V21" 
      stroke={selected ? "#FF69B4" : "#999"} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M9 18H15" 
      stroke={selected ? "#FF69B4" : "#999"} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const MaleIcon = ({ selected }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="10" 
      cy="14" 
      r="5" 
      stroke={selected ? "#FF69B4" : "#999"} 
      strokeWidth="2"
      fill={selected ? "rgba(255, 105, 180, 0.1)" : "none"}
    />
    <path 
      d="M15 9L21 3" 
      stroke={selected ? "#FF69B4" : "#999"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 3H21V8" 
      stroke={selected ? "#FF69B4" : "#999"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="12" 
      cy="7" 
      r="4" 
      stroke="#FF69B4" 
      strokeWidth="2"
    />
  </svg>
);

export const CycleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" 
      stroke="#FF69B4" 
      strokeWidth="2"
    />
    <path 
      d="M12 6V12L16 16" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const PartnerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="9" 
      cy="7" 
      r="4" 
      stroke="#FF69B4" 
      strokeWidth="2"
    />
    <path 
      d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9983 15.5735 20.2 15.3613" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ThemeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="12" 
      r="5" 
      stroke="#FF69B4" 
      strokeWidth="2"
    />
    <path 
      d="M12 1V3" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 21V23" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M4.22 4.22L5.64 5.64" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18.36 18.36L19.78 19.78" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M1 12H3" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 12H23" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M4.22 19.78L5.64 18.36" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18.36 5.64L19.78 4.22" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SecurityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 22S8 18 8 13V7L12 5L16 7V13C16 18 12 22 12 22Z" 
      stroke="#FF69B4" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const DeleteIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 6H5H21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Analytics Icons
export const ChartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 3V21H21" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 16L12 11L16 15L21 10" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const RefreshIcon = ({ size = 20, color = "#e91e63" }) => (
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
  </svg>
);

export const DropletIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2.69L17.66 8.35C18.78 9.47 19.5 11.05 19.5 12.74C19.5 16.58 16.34 19.74 12.5 19.74C8.66 19.74 5.5 16.58 5.5 12.74C5.5 11.05 6.22 9.47 7.34 8.35L12 2.69Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(233, 30, 99, 0.1)"
    />
  </svg>
);

export const FilledDropletIcon = ({ size = 20, color = "#FF0000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2.69L17.66 8.35C18.78 9.47 19.5 11.05 19.5 12.74C19.5 16.58 16.34 19.74 12.5 19.74C8.66 19.74 5.5 16.58 5.5 12.74C5.5 11.05 6.22 9.47 7.34 8.35L12 2.69Z" 
      fill={color}
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const TrendUpIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M23 6L13.5 15.5L8.5 10.5L1 18" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17 6H23V12" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ClockIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="#e91e63" 
      strokeWidth="2"
    />
    <path 
      d="M12 6V12L16 14" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const TimerIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="13" 
      r="8" 
      stroke="#e91e63" 
      strokeWidth="2"
    />
    <path 
      d="M12 9V13L15 15" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 2H15" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const RulerIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M21.3 8.7L15.3 2.7C15.1 2.5 14.8 2.5 14.6 2.7L2.7 14.6C2.5 14.8 2.5 15.1 2.7 15.3L8.7 21.3C8.9 21.5 9.2 21.5 9.4 21.3L21.3 9.4C21.5 9.2 21.5 8.9 21.3 8.7Z" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 17L17 7" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M10 10L14 14" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const BarChartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 20V10" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18 20V4" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M6 20V16" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CalendarIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="3" 
      y="4" 
      width="18" 
      height="18" 
      rx="2" 
      ry="2" 
      stroke="#e91e63" 
      strokeWidth="2"
    />
    <path 
      d="M16 2V6" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 2V6" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 10H21" 
      stroke="#e91e63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Chat Icons
export const MessageCircleIcon = ({ size = 24, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(255, 105, 180, 0.1)"
    />
  </svg>
);

export const UsersIcon = ({ size = 48, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="9" 
      cy="7" 
      r="4" 
      stroke={color} 
      strokeWidth="2"
      fill="rgba(255, 105, 180, 0.1)"
    />
    <path 
      d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9983 15.5735 20.2 15.3613" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const HeartIcon = ({ size = 48, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(255, 105, 180, 0.2)"
    />
  </svg>
);

export const MoreVerticalIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="1" fill={color} />
    <circle cx="12" cy="5" r="1" fill={color} />
    <circle cx="12" cy="19" r="1" fill={color} />
  </svg>
);

export const EditIcon = ({ size = 20, color = "#e91e63", onClick, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={style}
    {...props}
  >
    <path 
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const LogOutIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 17L21 12L16 7" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 12H9" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const LockIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="3" 
      y="11" 
      width="18" 
      height="11" 
      rx="2" 
      ry="2" 
      stroke={color} 
      strokeWidth="2"
    />
    <circle 
      cx="12" 
      cy="16" 
      r="1" 
      fill={color}
    />
    <path 
      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const BellIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const InfoIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke={color} 
      strokeWidth="2"
    />
    <path 
      d="M12 16V12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 8H12.01" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronLeftIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M15 18L9 12L15 6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 18L15 12L9 6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CopyIcon = ({ size = 20, color = "#e91e63", onClick, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={style}
    {...props}
  >
    <rect 
      x="9" 
      y="9" 
      width="13" 
      height="13" 
      rx="2" 
      ry="2" 
      stroke={color} 
      strokeWidth="2"
    />
    <path 
      d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const AlertTriangleIcon = ({ size = 20, color = "#FF6B35" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10.29 3.86L1.82 18C1.64486 18.3024 1.55523 18.6453 1.56023 18.9928C1.56524 19.3402 1.66467 19.6808 1.84888 19.9785C2.03309 20.2761 2.29518 20.5196 2.60973 20.6839C2.92427 20.8482 3.27907 20.9277 3.64 20.91H20.36C20.7209 20.9277 21.0757 20.8482 21.3903 20.6839C21.7048 20.5196 21.9669 20.2761 22.1511 19.9785C22.3353 19.6808 22.4348 19.3402 22.4398 18.9928C22.4448 18.6453 22.3551 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(255, 107, 53, 0.1)"
    />
    <path 
      d="M12 9V13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 17H12.01" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckCircleIcon = ({ size = 20, color = "#10B981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18203 2.99721 7.13214 4.39828 5.49883C5.79935 3.86553 7.69279 2.72636 9.79619 2.24223C11.8996 1.75809 14.1003 1.95185 16.07 2.79999" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 4L12 14.01L9 11.01" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ClockAlertIcon = ({ size = 20, color = "#F59E0B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke={color} 
      strokeWidth="2"
      fill="rgba(245, 158, 11, 0.1)"
    />
    <path 
      d="M12 6V12L16 14" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 2V4" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 20V22" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const LeafIcon = ({ size = 14, color = "#10B981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M11 20C11 20 7 16 7 12C7 8 11 4 11 4S15 8 15 12C15 16 11 20 11 20Z" 
      fill={color}
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M11 4C11 4 13 6 15 8C17 10 19 12 19 12" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const PendingIcon = ({ size = 14, color = "#F59E0B" }) => {
  // Convert hex color to rgba with 0.2 opacity
  const hexToRgba = (hex, alpha = 0.2) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="2"
        fill={hexToRgba(color, 0.2)}
      />
      <path 
        d="M12 6V12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="12" 
        cy="16" 
        r="1" 
        fill={color}
      />
    </svg>
  );
};
export const SmallHeartIcon = ({ size = 16, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" 
      fill={color}
      stroke="none"
    />
  </svg>
);
export const NotificationIcon = ({ size = 20, color = "#e91e63" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(233, 30, 99, 0.1)"
    />
    <path 
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
export const FlowerIcon = ({ size = 14, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill={color} />
    <ellipse cx="12" cy="5" rx="2.5" ry="4" fill={color} opacity="0.8" />
    <ellipse cx="12" cy="19" rx="2.5" ry="4" fill={color} opacity="0.8" />
    <ellipse cx="5" cy="12" rx="4" ry="2.5" fill={color} opacity="0.8" />
    <ellipse cx="19" cy="12" rx="4" ry="2.5" fill={color} opacity="0.8" />
    <ellipse cx="7" cy="7" rx="2.5" ry="3.5" fill={color} opacity="0.7" transform="rotate(-45 7 7)" />
    <ellipse cx="17" cy="7" rx="2.5" ry="3.5" fill={color} opacity="0.7" transform="rotate(45 17 7)" />
    <ellipse cx="7" cy="17" rx="2.5" ry="3.5" fill={color} opacity="0.7" transform="rotate(45 7 17)" />
    <ellipse cx="17" cy="17" rx="2.5" ry="3.5" fill={color} opacity="0.7" transform="rotate(-45 17 17)" />
  </svg>
);

export const ExpectedDropletIcon = ({ size = 14, color = "#FFB5E8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2.69L17.66 8.35C18.78 9.47 19.5 11.05 19.5 12.74C19.5 16.58 16.34 19.74 12.5 19.74C8.66 19.74 5.5 16.58 5.5 12.74C5.5 11.05 6.22 9.47 7.34 8.35L12 2.69Z" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      strokeDasharray="4 2"
      fill="none"
    />
  </svg>
);

export const PinMoonIcon = ({ size = 64, color = "#FF69B4" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="32" 
      cy="32" 
      r="28" 
      fill="url(#pinMoonGradient)"
      stroke={color}
      strokeWidth="2"
    />
    <circle 
      cx="40" 
      cy="20" 
      r="3" 
      fill="rgba(255, 255, 255, 0.8)"
    />
    <circle 
      cx="48" 
      cy="32" 
      r="2" 
      fill="rgba(255, 255, 255, 0.6)"
    />
    <circle 
      cx="44" 
      cy="44" 
      r="2.5" 
      fill="rgba(255, 255, 255, 0.7)"
    />
    <path 
      d="M20 24C22 26 24 28 26 30C28 32 30 34 32 36" 
      stroke="rgba(255, 255, 255, 0.4)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    <defs>
      <linearGradient id="pinMoonGradient" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF69B4"/>
        <stop offset="0.5" stopColor="#FFB6C1"/>
        <stop offset="1" stopColor="#FF1493"/>
      </linearGradient>
    </defs>
  </svg>
);