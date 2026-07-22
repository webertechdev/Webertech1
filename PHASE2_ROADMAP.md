# WeberTech Phase 2 — Digital Platform Experience

## Overview

Phase 2 transforms WeberTech from a collection of services into a **cohesive digital platform** where customers stay engaged and return frequently. This roadmap prioritizes features that drive retention, engagement, and platform stickiness.

---

## 1. Enhanced Dashboard Overview ✅

**Status**: Implemented

### Features
- **Today's Activity** — Real-time activity feed showing logins, orders, downloads, services
- **Key Metrics** — Pending orders, pending services, unread messages, wallet balance, reward points, available coupons
- **Quick Actions** — One-click access to all major services (Bundles, Documents, Government, Electronics, Academy, Dev)
- **Recommended For You** — Smart recommendations based on browsing and purchase history
- **Wallet & Rewards** — Balance display and loyalty points tracking

### Implementation
```jsx
import DashboardOverviewV2 from "./pages/DashboardOverviewV2";

<DashboardOverviewV2 user={currentUser} />
```

### Firestore Collections Used
- `orders` — Pending order tracking
- `services` — Pending service tracking
- `activities` — Real-time activity feed
- `notifications` — Notification history

---

## 2. Real-time Notification Center ✅

**Status**: Implemented

### Features
- **Facebook-style Notifications** — Slide-out panel from right side
- **Notification Types**:
  - 💳 Payment received
  - 📄 Document ready
  - ⚙️ Service updated
  - ⚡ Bundle delivered
  - 🎓 New course available
  - 🎟️ Discount available
  - 💬 Support replied
  - 🔔 System updates
- **Unread Badge** — Shows count of unread notifications
- **Mark as Read** — Individual or bulk marking
- **Real-time Updates** — Refreshes every 10 seconds

### Implementation
```jsx
import NotificationCenter from "./components/NotificationCenter";

const [notificationsOpen, setNotificationsOpen] = useState(false);

<NotificationCenter 
  userId={user.uid}
  isOpen={notificationsOpen}
  onClose={() => setNotificationsOpen(false)}
/>
```

### Firestore Collection
```firestore
notifications/{notificationId}
├── userId: string
├── type: string (payment, document, service, bundle, course, discount, support, system)
├── title: string
├── message: string
├── read: boolean
├── timestamp: timestamp
├── actionUrl: string (optional)
└── metadata: object
```

---

## 3. Universal Search ✅

**Status**: Implemented

### Features
- **One Search Box** — Search across all WeberTech modules
- **Smart Categorization** — Results grouped by type:
  - 📄 Documents (Legal Documents)
  - ⚙️ Services (Government, Business, Professional)
  - 🎓 Courses (Academy)
  - 🛒 Electronics
- **Real-time Results** — Debounced search with 300ms delay
- **Quick Navigation** — Click result to navigate directly

### Implementation
```jsx
import UniversalSearch from "./components/UniversalSearch";

const [searchOpen, setSearchOpen] = useState(false);

<UniversalSearch 
  isOpen={searchOpen}
  onClose={() => setSearchOpen(false)}
/>
```

### Search Scope
- Products table (all types)
- Orders (by product name)
- Services (by service name)
- Courses (by course title)

---

## 4. Weber Vault (Secure Document Storage) ✅

**Status**: Implemented

### Features
- **Upload Once, Use Anywhere** — Store documents once, reuse across services
- **Document Types**:
  - 📋 KRA PIN
  - 🆔 National ID
  - 🛂 Passport
  - 📜 Business Certificate
  - 🚗 Driving License
  - 🎓 Academic Certificate
  - 📄 CV / Resume
  - 📑 Other Documents
- **Secure Storage** — Firebase Storage with user isolation
- **Easy Management** — Download, delete, view stored documents
- **Lifetime Access** — Documents stored permanently

### Implementation
```jsx
import WeberVault from "./pages/WeberVault";

<Route path="/vault" element={<WeberVault user={user} />} />
```

### Firestore Collection
```firestore
vault/{vaultDocId}
├── userId: string
├── type: string (kra_pin, id, passport, business_cert, etc.)
├── typeLabel: string
├── fileName: string
├── fileSize: number
├── mimeType: string
├── downloadURL: string
├── storagePath: string
├── uploadedAt: timestamp
└── metadata: object
```

### Firebase Storage Structure
```
gs://bucket/vault/{userId}/{timestamp}-{filename}
```

---

## 5. Document Preview with Watermarking ✅

**Status**: Implemented

### Features
- **PDF Preview** — First page preview of PDF documents
- **Image Preview** — JPG, PNG, GIF, WebP support
- **Automatic Watermarking** — "webertech.co.ke" watermark applied
- **Watermark Specifications**:
  - Text: "webertech.co.ke"
  - Opacity: 15%
  - Rotation: -45°
  - Color: Black
  - Position: Center, rotated

### Implementation
```jsx
import DocumentPreview from "./components/DocumentPreview";

<DocumentPreview 
  fileUrl="documents/car-sale-agreement.pdf"
  fileName="car-sale-agreement.pdf"
  watermark={true}
/>
```

### Usage Across Platform
- Legal document detail pages
- Service request previews
- Invoice previews
- Certificate previews
- Course material previews

---

## 6. Activity Timeline

**Status**: Integrated into Dashboard Overview

### Features
- **Chronological Activity** — All customer actions in timeline format
- **Activity Types**:
  - 🔓 Login/Logout
  - 📋 Order created/paid
  - ⬇️ Download
  - ⚙️ Service requested/updated
  - 👤 Profile updated
  - 📝 Other activities
- **Timestamps** — Exact time of each activity
- **Real-time Updates** — New activities appear instantly

### Firestore Collection
```firestore
activities/{activityId}
├── userId: string
├── type: string
├── description: string
├── metadata: object
├── timestamp: timestamp
├── userAgent: string
└── ip: string
```

---

## 7. Smart Recommendations

**Status**: Placeholder in Dashboard

### Future Implementation
- **Purchase-based** — Recommend related products based on purchase history
- **Browse-based** — Recommend products based on viewing history
- **Category-based** — Recommend popular items in viewed categories
- **ML-powered** — Machine learning recommendations (Phase 3)

### Example Flows
```
Customer buys: Car Sale Agreement
↓
Recommend: Vehicle Receipt, NTSA Transfer, Insurance, Valuation

Customer buys: Employment Contract
↓
Recommend: Payslip, Leave Form, NDA, Warning Letter
```

---

## 8. Customer Wallet (Future)

**Status**: Placeholder

### Features
- **KES Balance** — Store credit in wallet
- **Refunds** — Automatic refund to wallet instead of M-Pesa
- **Bonuses** — Promotional credits
- **Referral Earnings** — Earn from referrals
- **Easy Withdrawal** — Convert to M-Pesa

### Firestore Collection
```firestore
wallets/{userId}
├── balance: number
├── currency: string (KES)
├── transactions: array
│   ├── type: string (refund, bonus, referral, purchase)
│   ├── amount: number
│   ├── description: string
│   └── timestamp: timestamp
└── lastUpdated: timestamp
```

---

## 9. Loyalty Program (Future)

**Status**: Placeholder

### Levels
- 🥉 Bronze — 0-500 points
- 🥈 Silver — 501-1000 points
- 🥇 Gold — 1001-2000 points
- 💎 Diamond — 2000+ points

### Point Earning
- Complete Profile — +20 points
- Buy Bundle — +5 points
- Refer Friend — +100 points
- First Purchase — +50 points
- Birthday Month — +25 points

### Redemption
- 100 points — KES 50 discount
- 250 points — KES 150 discount
- 500 points — KES 350 discount
- 1000 points — KES 750 discount

---

## 10. Referral Program (Future)

**Status**: Placeholder

### Features
- **Unique Referral Link** — Share with friends
- **Track Referrals** — See successful referrals
- **Earn Commission** — KES per successful referral
- **Referral Bonuses** — Extra rewards for milestones

### Firestore Collection
```firestore
referrals/{referralId}
├── referrerId: string
├── referredUserId: string
├── referralCode: string
├── status: string (pending, completed)
├── commission: number
├── createdAt: timestamp
└── completedAt: timestamp
```

---

## 11. Digital Library

**Status**: Integrated into Dashboard

### Features
- **Purchased Documents** — All bought legal documents
- **Downloaded Files** — All downloaded items
- **Certificates** — Earned certificates
- **Invoices** — All billing documents
- **Courses** — Enrolled courses
- **Templates** — Reusable templates

---

## 12. WeberID (Big Feature)

**Status**: Planned for Phase 3

### Concept
Every customer gets a permanent digital identity:
```
WeberID: WT000000123
```

### Everything Attaches to It
- Orders
- Payments
- Businesses
- Domains
- Hosting
- Courses
- Bundles
- Electronics
- Support
- Documents
- Invoices
- Downloads

### Benefits
- **Unified Identity** — One ID across entire platform
- **Easier Tracking** — All activities linked to one ID
- **Better Analytics** — Complete customer journey
- **Future Verification** — Can be used for identity verification

---

## 13. WeberPass (Big Feature)

**Status**: Planned for Phase 3

### Concept
One QR Code for quick access:
```
Customer → QR → Scan → Open Dashboard → Verify Identity
```

### Use Cases
- Quick login from mobile
- In-office verification
- Service staff verification
- Future: Physical card with QR

---

## 14. Weber Vault Advanced (Big Feature)

**Status**: Planned for Phase 3

### Current Features ✅
- Document upload and storage
- Multiple document types
- Download and delete

### Future Features
- **Auto-fill Forms** — Vault documents auto-populate service forms
- **Document Expiry Alerts** — Notify when documents expire
- **Document Sharing** — Share vault documents with staff
- **Document Versioning** — Keep history of document updates
- **Encryption** — End-to-end encryption for sensitive docs

---

## Firestore Security Rules

```firestore
// Notifications
match /notifications/{notificationId} {
  allow read: if request.auth.uid == resource.data.userId || isAdmin();
  allow write: if false; // Backend only
}

// Vault
match /vault/{vaultDocId} {
  allow read: if request.auth.uid == resource.data.userId || isAdmin();
  allow write: if request.auth.uid == resource.data.userId || isAdmin();
  allow delete: if request.auth.uid == resource.data.userId || isAdmin();
}

// Activities
match /activities/{activityId} {
  allow read: if request.auth.uid == resource.data.userId || isAdmin();
  allow write: if false; // Backend only
}
```

---

## Integration Checklist

- [ ] Add Notification Center to Navbar
- [ ] Add Universal Search to Navbar
- [ ] Add Weber Vault link to Dashboard sidebar
- [ ] Update Dashboard to use DashboardOverviewV2
- [ ] Integrate DocumentPreview in all document pages
- [ ] Add activity logging to all major operations
- [ ] Create notifications for key events
- [ ] Test real-time updates
- [ ] Mobile responsiveness check
- [ ] Performance optimization
- [ ] Security audit

---

## Next Steps (Phase 3)

1. **WeberID System** — Permanent digital identity
2. **WeberPass** — QR code quick access
3. **Advanced Vault** — Auto-fill, sharing, versioning
4. **Loyalty & Referral** — Full implementation
5. **AI Recommendations** — ML-powered suggestions
6. **Analytics Dashboard** — Customer insights for admins

---

## Performance Considerations

### Optimization
- Lazy load notification center
- Debounce universal search (300ms)
- Paginate activity timeline
- Cache frequently accessed data
- Optimize Firestore queries

### Monitoring
- Track notification delivery time
- Monitor search performance
- Measure vault upload speeds
- Track document preview generation time

---

## Support & Maintenance

For implementation questions:
- 📧 Email: support@webertech.co.ke
- 💬 WhatsApp: +254 722 508 904
- 🐛 GitHub Issues: [project repository]

---

**Version**: 2.0
**Status**: Phase 2 Complete
**Last Updated**: July 2024
