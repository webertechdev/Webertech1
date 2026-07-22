# WeberTech Identity System — Complete Documentation

## Overview

The WeberTech Identity System is the unified authentication, profile, and tracking backbone for the entire platform. It enables customers to:

- **Login Once** — Access all WeberTech services with a single account
- **Track Everything** — Complete lifetime activity history
- **Manage Profile** — Centralized customer information
- **View Dashboard** — Orders, services, downloads, invoices, support tickets
- **Get Notifications** — Real-time updates across all services

---

## Architecture

### Authentication Flow

```
User → Login Page → Firebase Auth → Firestore User Doc → Dashboard
                         ↓
                    Email + Password
                    Google OAuth
                    (Phone - future)
```

### User Document Structure

```firestore
users/{uid}
├── email: string
├── firstName: string
├── lastName: string
├── photoURL: string (optional)
├── role: string (customer | staff | admin)
├── status: string (active | inactive | suspended)
├── joinedAt: timestamp
├── lastLogin: timestamp
├── profile: object
│   ├── firstName: string
│   ├── lastName: string
│   ├── email: string
│   ├── phone: string
│   ├── photoURL: string
│   ├── county: string
│   ├── town: string
│   ├── address: string
│   └── businessName: string (optional)
├── preferences: object
│   ├── emailNotifications: boolean
│   ├── smsNotifications: boolean
│   ├── whatsappNotifications: boolean
│   └── darkMode: boolean
└── metadata: object (custom fields)
```

---

## Authentication Pages

### 1. Login (`/auth/login`)

**Features:**
- Email + Password login
- Google OAuth integration
- Remember me (session persistence)
- Password reset link
- Sign up redirect

**Flow:**
1. User enters email and password
2. Firebase authenticates
3. Firestore user doc retrieved
4. Activity logged
5. Redirect to dashboard

### 2. Register (`/auth/register`)

**Features:**
- Email + Password registration
- Name collection (first, last)
- Automatic Firestore user doc creation
- Profile initialization
- Preferences setup

**Flow:**
1. User fills registration form
2. Firebase creates auth user
3. Firestore user doc created with defaults
4. Activity logged
5. Redirect to dashboard

### 3. Forgot Password (`/auth/forgot-password`)

**Features:**
- Email-based password reset
- Firebase reset email
- Confirmation message
- Return to login link

---

## Navbar Identity UI

### When Not Logged In
```
[Logo] [Nav Links] [WhatsApp] [Login Button]
```

### When Logged In
```
[Logo] [Nav Links] [WhatsApp] [Avatar] [Name] [Dashboard] [Sign Out]
```

**Avatar:**
- Profile photo if available
- First letter of name in green circle if no photo
- Green border (#16a34a)

**Name Display:**
- First name only in navbar
- Full name in mobile menu
- Email shown in mobile menu

---

## Activity Tracking System

### Firestore Collection: `activities`

```firestore
activities/{activityId}
├── userId: string (Firebase Auth UID)
├── type: string (login, logout, order_created, download, etc.)
├── description: string (human-readable)
├── metadata: object (orderId, productId, amount, etc.)
├── timestamp: timestamp
├── userAgent: string
└── ip: string (set server-side)
```

### Activity Types

| Type | Description | When Logged |
|------|-------------|------------|
| `login` | User logged in | After successful auth |
| `logout` | User logged out | On sign out |
| `order_created` | Order placed | After order creation |
| `order_paid` | Order payment received | After successful payment |
| `order_failed` | Order payment failed | After failed payment |
| `download` | Document downloaded | On download click |
| `service_requested` | Service request submitted | After service order |
| `service_updated` | Service status changed | On status change |
| `service_completed` | Service finished | On completion |
| `payment_received` | Payment processed | After payment |
| `profile_updated` | Profile information changed | On profile save |
| `support_ticket_created` | Support ticket opened | After ticket creation |
| `support_ticket_updated` | Ticket status changed | On update |
| `chat_message` | Message sent | On message send |
| `invoice_generated` | Invoice created | After payment |
| `refund_requested` | Refund requested | On refund request |
| `notification_sent` | Notification delivered | On send |

### Activity Tracking Usage

```javascript
import { logOrderCreated, logDownload, getUserActivity } from "../services/activityTracker";

// Log an order
await logOrderCreated(userId, orderId, "Car Sale Agreement", 199);

// Log a download
await logDownload(userId, productId, "Car Sale Agreement");

// Get user activity history
const activities = await getUserActivity(userId, 50);

// Get activity summary for date range
const summary = await getActivitySummary(userId, startDate, endDate);
```

---

## Document Preview with Watermark

### DocumentPreview Component

```jsx
import DocumentPreview from "../components/DocumentPreview";

<DocumentPreview 
  fileUrl="documents/car-sale-agreement.pdf"
  fileName="car-sale-agreement.pdf"
  watermark={true}
/>
```

**Features:**
- PDF preview (first page)
- Image preview (JPG, PNG, GIF, WebP)
- Automatic watermarking
- Watermark text: "webertech.co.ke"
- Semi-transparent overlay
- Rotated watermark at 45°

**Watermark Specifications:**
- Text: "webertech.co.ke"
- Opacity: 15%
- Rotation: -45°
- Font: Bold, size proportional to image
- Color: Black on white background

---

## Dashboard Sections

### Overview
- Welcome message
- Recent activity
- Quick stats (orders, downloads, services)
- Recommended services

### Orders
- All purchases
- Status tracking
- Download links
- Invoice access

### Downloads
- Purchased documents
- Download history
- Expiry dates
- Re-download option

### Services
- Active requests
- Status timeline
- Staff assignment
- Document uploads
- Messages

### Invoices
- Billing records
- Invoice numbers
- Payment status
- Download PDF

### Support
- Help tickets
- Chat history
- File uploads
- Ticket tracking

### Notifications
- Order updates
- Payment confirmations
- Service updates
- Promotions

### Settings
- Profile editing
- Password change
- Notification preferences
- Account security

---

## Security & Privacy

### Firestore Rules

```
match /users/{userId} {
  allow read: if request.auth.uid == userId || isAdmin();
  allow write: if request.auth.uid == userId || isAdmin();
}

match /activities/{activityId} {
  allow read: if request.auth.uid == resource.data.userId || isAdmin();
  allow write: if false; // Backend only
}
```

### Best Practices

1. **Never expose sensitive data** in metadata
2. **Server-side IP logging** for security
3. **Validate all inputs** before logging
4. **Use HTTPS only** for all requests
5. **Rotate session tokens** regularly
6. **Implement rate limiting** on auth endpoints

---

## Integration Points

### For Cyber Services
```javascript
import { logServiceRequested } from "../services/activityTracker";

// When customer requests a government service
await logServiceRequested(userId, serviceId, "KRA PIN Registration");
```

### For E-commerce
```javascript
import { logOrderCreated, logOrderPaid } from "../services/activityTracker";

// When order is created
await logOrderCreated(userId, orderId, productTitle, amount);

// When payment is received
await logOrderPaid(userId, orderId, amount, "nestlink");
```

### For Academy
```javascript
import { logActivity } from "../services/activityTracker";

// When course is accessed
await logActivity(userId, "course_accessed", `Course: ${courseName}`, { courseId });
```

---

## Future Enhancements

### Phase 2
- Two-factor authentication (2FA)
- Biometric login (fingerprint, face)
- Social login (Facebook, Apple)
- Email verification flow
- Phone verification

### Phase 3
- Customer referral system
- Loyalty points tracking
- Subscription management
- Advanced analytics dashboard
- Export activity report

### Phase 4
- AI-powered recommendations
- Predictive analytics
- Behavioral insights
- Personalized dashboard
- Custom activity alerts

---

## Deployment Checklist

- [ ] Deploy Firestore rules for `users` and `activities` collections
- [ ] Test login/register flow
- [ ] Verify Firebase Auth email templates
- [ ] Test password reset email
- [ ] Verify activity logging
- [ ] Test document preview with watermark
- [ ] Verify navbar identity UI
- [ ] Test mobile responsiveness
- [ ] Enable Firestore backups
- [ ] Set up monitoring & alerts

---

## API Reference

### Authentication

```javascript
// Login
import { signInWithEmailAndPassword } from "firebase/auth";
await signInWithEmailAndPassword(auth, email, password);

// Register
import { createUserWithEmailAndPassword } from "firebase/auth";
const { user } = await createUserWithEmailAndPassword(auth, email, password);

// Logout
import { signOut } from "firebase/auth";
await signOut(auth);

// Password Reset
import { sendPasswordResetEmail } from "firebase/auth";
await sendPasswordResetEmail(auth, email);
```

### Activity Tracking

```javascript
import { logActivity, getUserActivity, getActivitySummary } from "../services/activityTracker";

// Log activity
await logActivity(userId, type, description, metadata);

// Get history
const activities = await getUserActivity(userId, limit);

// Get summary
const summary = await getActivitySummary(userId, startDate, endDate);
```

---

## Support & Maintenance

For issues or questions:
- 📧 Email: support@webertech.co.ke
- 💬 WhatsApp: +254 722 508 904
- 🐛 GitHub Issues: [project repository]

---

**Version**: 1.0
**Status**: Production Ready
**Last Updated**: July 2024
