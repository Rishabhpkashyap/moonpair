# Firebase Realtime Database Rules Explanation

## Overview

These rules provide comprehensive security for your MoonPair couple period tracker app, ensuring data privacy and proper access control.

## Rule Structure

### 1. Users Data (`/users/$userId`)

```json
"users": {
  "$userId": {
    ".read": "auth != null && auth.uid == $userId",
    ".write": "auth != null && auth.uid == $userId"
  }
}
```

**Security Features:**
- ✅ Users can only access their own data
- ✅ Requires authentication
- ✅ Prevents unauthorized access to other users' profiles

**Data Validation:**
- Profile must have `name` and `email`
- Cycle length: 21-35 days (medically valid range)
- Period length: 3-8 days (medically valid range)
- Date format validation for period history

### 2. Chat Data (`/chats/$chatId`)

```json
"chats": {
  "$chatId": {
    ".read": "auth != null && ($chatId.contains(auth.uid + '_') || $chatId.contains('_' + auth.uid))",
    ".write": "auth != null && ($chatId.contains(auth.uid + '_') || $chatId.contains('_' + auth.uid))"
  }
}
```

**Security Features:**
- ✅ Only participants in a chat can access it
- ✅ Chat ID format: `userId1_userId2` (alphabetically sorted)
- ✅ Message validation (length, sender verification)
- ✅ Timestamp validation prevents future-dated messages

### 3. Invite Codes (`/inviteCodes/$code`)

```json
"inviteCodes": {
  "$code": {
    ".read": "auth != null",
    ".write": "auth != null && (newData.child('createdBy').val() == auth.uid || data.child('createdBy').val() == auth.uid)"
  }
}
```

**Security Features:**
- ✅ Anyone authenticated can read codes (for validation)
- ✅ Only code creator can modify their codes
- ✅ Expiration time validation
- ✅ Email format validation

## Data Structure Protected

### User Profile
```
users/
  $userId/
    profile/
      name: string (required)
      email: string (required, email format)
      photoURL: string (optional)
      nickname: string (optional)
      role: string (optional)
```

### Cycle Data
```
users/
  $userId/
    cycle/
      cycleLength: number (21-35)
      periodLength: number (3-8)
      lastPeriodStart: string (YYYY-MM-DD format)
      lastPeriodEnd: string (YYYY-MM-DD format)
      history: array of period records
```

### Partner Connection
```
users/
  $userId/
    partner/
      partnerId: string (required)
      partnerEmail: string (required, email format)
      partnerName: string (required)
      connectedAt: number (timestamp)
```

### Chat Messages
```
chats/
  $chatId/
    messages/
      $messageId/
        text: string (1-1000 characters)
        senderId: string (must match auth.uid)
        timestamp: number (not future)
        status: string (sent/delivered/read)
```

## Security Benefits

1. **Data Privacy**: Users can only access their own data
2. **Partner Access**: Partners can only access shared chat data
3. **Input Validation**: All data is validated for format and content
4. **Authentication Required**: All operations require valid authentication
5. **Prevent Data Tampering**: Users can't modify others' data
6. **Medical Accuracy**: Cycle data is validated within medically acceptable ranges

## How to Apply Rules

1. Go to Firebase Console
2. Navigate to Realtime Database > Rules
3. Copy the contents of `firebase-database-rules.json`
4. Paste into the rules editor
5. Click "Publish"

## Testing Rules

Use Firebase Rules Playground to test:
- User accessing their own data ✅
- User accessing another user's data ❌
- Partner accessing shared chat ✅
- Unauthenticated access ❌
- Invalid data formats ❌

These rules ensure your app is secure, compliant, and protects user privacy while enabling the core functionality of your couple period tracker.