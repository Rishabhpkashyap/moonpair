# Couple Period Tracker App – Final Product Specification

## 1. Purpose & Scope
This application is a **personal-use couple period tracker** designed for one female primary user (GF) and one connected male partner. The app focuses on transparency, shared awareness, and simplicity. It is **not a medical app** and makes no health guarantees.

All data (except PIN) is stored in **Firebase Realtime Database** so that both partners see the same information in real time.

---

## 2. Core Principles
- One primary user + one partner only
- Partner access is **read-only** for health data
- Primary user has full control
- Data sharing is intentional and revocable
- Simple UX, no feature overload

---

## 3. User Roles

### 3.1 Primary User (GF)
- Owner of all cycle data
- Can edit period and cycle information
- Can connect or disconnect partner
- Full access to all tabs

### 3.2 Partner (Male)
- Read-only access to GF’s cycle data
- Can view Home and Analytics tabs
- Can chat
- Cannot edit any health data

---

## 4. App Lock (Security)
- Mandatory 4-digit PIN on first launch
- PIN stored **locally on device only**
- App locks when sent to background
- PIN can be changed from Settings

---

## 5. Tab Navigation (Fixed Order)
1. Home
2. Partner Chat
3. Analytics
4. Settings

Navigation and available actions depend on user role.

---

## 6. HOME TAB (Dashboard)

### Purpose
Provide a clear, real-time view of the current menstrual cycle state.

### Displayed for Both Users
- **Current Phase** (Period / PMS / Ovulation / Normal)
- **Next Phase** (text only)
- **Expected Period Countdown** (e.g., “Expected in 4 days”)
- **Calendar Preview** (current month)
  - Period days highlighted
  - Expected period days outlined

### Actions
- **Primary User Only**:
  - Period Started (default date = today, editable)
  - Period Ended (default date = today, editable)

- **Partner View**:
  - All data is visible
  - Action buttons are hidden

---

## 7. PARTNER CHAT TAB

### Purpose
Private communication channel between the connected couple.

### Features
- One-to-one chat only
- Chat header shows partner name
- Text messages
- Emoji support
- Message status: Sent / Read

### Backend
- Firebase Realtime Database
- Single chat node per connected couple

### Restrictions
- No media sharing
- No voice or video calls
- No groups or multiple chats

---

## 8. ANALYTICS TAB

### Purpose
Show cycle patterns and history without medical interpretation.

### Displayed Data (Read-only for Partner)
- Cycle history list (start date, duration)
- Average cycle length
- Average period length
- Early / late cycle count
- Longest cycle
- Shortest cycle

### Editing
- No direct editing
- All values auto-calculated from stored cycle data

---

## 9. SETTINGS TAB

### 9.1 Profile
- User name (mandatory)
- Editable
- Used in chat display

### 9.2 Cycle Settings
- Cycle length
- Period length

### 9.3 Partner Management
- Generate 6-digit one-time invite code (valid for 10 minutes)
- Enter invite code to connect
- Disconnect partner
  - Removes partner link
  - Deletes chat data

### 9.4 App Lock
- Change PIN

### 9.5 Data Control
- Delete all data
- Double confirmation required
- Removes cycle data, chat, and partner link

---

## 10. Partner Connect Flow
1. Primary user generates invite code
2. Partner enters code
3. Successful verification links both users
4. Partner gains read-only access to Home & Analytics
5. Chat tab becomes active

Disconnect is instant and silent.

---

## 11. Data Storage Model

### Stored in Firebase RTDB
- User profile (name, role)
- Partner link
- Cycle & period data
- Analytics-calculated values
- Chat messages

### Not Stored in Firebase
- App PIN

---

## 12. Theme & UI Guidelines

### Light Theme
- Soft pinks, lavender, peach
- White backgrounds
- Rounded cards

### Dark Theme
- Muted purples, rose accents
- Dark grey / black backgrounds

### Design Style
- Girlish but mature
- Calm, reassuring visuals
- Minimal animations
- Rounded corners

---

## 13. Out of Scope (Explicit)
- Mood or pain tracking
- Medical advice or predictions
- AI features
- Multiple partners
- Notifications overload
- Data export
- Media sharing

---

## 14. Final Note
This document represents the **final locked scope** of the application. Any additional feature must not compromise privacy, simplicity, or trust between partners.

**Status: FINAL – Ready for Development**

