# WeberTech Firestore Schema — Phase 1 Complete

This document defines the complete Firestore data model for WeberTech Phase 1, including all collections, document structures, and relationships.

## Collections Overview

### 1. **products** — Product Catalog (Master Data)
Stores all sellable items across WeberTech: documents, services, courses, electronics, domains, hosting, etc.

```
products/{productId}
├── id: string (unique identifier)
├── slug: string (URL-friendly, unique)
├── title: string
├── category: string (legal-document | service | course | electronics | domain | hosting | bundle)
├── subcategory: string (vehicle | land | employment | business | etc.)
├── description: string (long-form)
├── price: number (in KES)
├── type: string (document | service | electronics | course | bundle | hosting | domain)
├── image: string (emoji or URL)
├── downloadFile: string (Firebase Storage URL, empty until uploaded)
├── features: array<string>
├── includes: array<string>
├── status: string (active | inactive | archived)
├── createdAt: timestamp
├── updatedAt: timestamp
└── metadata: object (custom fields per type)
```

**Firestore Rules:**
```
match /products/{productId} {
  allow read: if resource.data.status == "active";
  allow write: if false; // Admin SDK only
}
```

---

### 2. **orders** — Purchase Orders (Core Transaction Record)
Every purchase creates an order, regardless of product type. Orders track payment status and fulfillment.

```
orders/{orderId}  // Format: WT-{timestamp}-{6 random alphanumeric}
├── orderId: string (unique, matches Firestore doc ID)
├── customerId: string (Firebase Auth UID, null for guests)
├── customerName: string
├── customerEmail: string
├── customerPhone: string
├── productId: string
├── productSlug: string
├── productTitle: string
├── type: string (document | service | electronics | course | bundle | hosting | domain)
├── amount: number (KES)
├── currency: string (KES)
├── paymentMethod: string (nestlink | intasend | safaricom)
├── status: string (pending | paid | failed | cancelled)
├── mpesaRef: string (M-PESA transaction reference, if applicable)
├── providerRef: object
│   ├── checkoutId: string (IntaSend checkout ID)
│   ├── checkoutUrl: string (IntaSend hosted checkout URL)
│   └── [other provider-specific fields]
├── failReason: string (error message if status == failed)
├── createdAt: timestamp
├── updatedAt: timestamp
└── metadata: object (custom fulfillment data)
```

**Firestore Rules:**
```
match /orders/{orderId} {
  allow read: if true;  // orderId is unguessable; used for status polling
  allow write: if false; // Admin SDK only
}
```

---

### 3. **payments** — Payment Records (Audit Trail)
Immutable record of every successful payment. One payment per order.

```
payments/{paymentId}
├── orderId: string (reference to orders/{orderId})
├── customerId: string (Firebase Auth UID)
├── method: string (nestlink | intasend | safaricom)
├── status: string (paid | refunded | disputed)
├── amount: number (KES)
├── currency: string (KES)
├── phone: string (M-PESA phone number)
├── mpesaRef: string (M-PESA transaction reference)
├── rawPayload: object (full webhook payload from provider)
├── createdAt: timestamp
└── metadata: object (custom fields)
```

**Firestore Rules:**
```
match /payments/{paymentId} {
  allow read: if request.auth.uid == resource.data.customerId || isAdmin();
  allow write: if false; // Admin SDK only
}
```

---

### 4. **downloads** — Document Downloads (Fulfillment for Documents)
Created when a document order is paid. Tracks download access and expiry.

```
downloads/{downloadId}
├── orderId: string (reference to orders/{orderId})
├── customerId: string (Firebase Auth UID)
├── productId: string
├── productSlug: string
├── downloadCount: number (increments each download)
├── expiresAt: timestamp (30 days from creation by default)
├── createdAt: timestamp
└── metadata: object
```

**Firestore Rules:**
```
match /downloads/{downloadId} {
  allow read: if request.auth.uid == resource.data.customerId;
  allow write: if false; // Admin SDK only
}
```

---

### 5. **services** — Service Requests (Fulfillment for Services)
Created when a service order is paid. Tracks service status and staff assignment.

```
services/{serviceId}
├── orderId: string (reference to orders/{orderId})
├── customerId: string (Firebase Auth UID)
├── productId: string
├── productSlug: string
├── status: string (new | assigned | in_progress | completed | cancelled)
├── assignedStaff: string (staff member UID, null until assigned)
├── staffNotes: string (internal notes)
├── customerNotes: string (customer-provided details)
├── documents: array<object>
│   ├── name: string
│   └── url: string (Firebase Storage URL)
├── timeline: array<object>
│   ├── status: string
│   ├── timestamp: timestamp
│   └── note: string
├── createdAt: timestamp
├── updatedAt: timestamp
└── completedAt: timestamp (null until completed)
```

**Firestore Rules:**
```
match /services/{serviceId} {
  allow read: if request.auth.uid == resource.data.customerId || isAdmin();
  allow write: if isAdmin(); // Staff updates via admin
}
```

---

### 6. **invoices** — Invoices (Billing Records)
Generated after payment for accounting and customer reference.

```
invoices/{invoiceId}
├── orderId: string (reference to orders/{orderId})
├── customerId: string (Firebase Auth UID)
├── invoiceNumber: string (unique, e.g., INV-2024-001)
├── amount: number (KES)
├── currency: string (KES)
├── items: array<object>
│   ├── productTitle: string
│   ├── quantity: number
│   ├── unitPrice: number
│   └── subtotal: number
├── subtotal: number
├── tax: number (if applicable)
├── total: number
├── status: string (draft | issued | paid | overdue | cancelled)
├── issuedAt: timestamp
├── dueAt: timestamp
├── paidAt: timestamp (null until paid)
├── createdAt: timestamp
└── metadata: object
```

---

### 7. **refunds** — Refund Records (Returns & Disputes)
Tracks all refund requests and their status.

```
refunds/{refundId}
├── orderId: string (reference to orders/{orderId})
├── paymentId: string (reference to payments/{paymentId})
├── customerId: string (Firebase Auth UID)
├── amount: number (KES)
├── reason: string (customer_request | technical_issue | duplicate_charge | other)
├── status: string (requested | approved | processing | completed | rejected)
├── requestedAt: timestamp
├── approvedAt: timestamp (null until approved)
├── completedAt: timestamp (null until completed)
├── notes: string (admin notes)
├── createdAt: timestamp
└── metadata: object
```

---

### 8. **subscriptions** — Recurring Subscriptions (Future)
For recurring products like hosting, domains, SaaS, etc.

```
subscriptions/{subscriptionId}
├── customerId: string (Firebase Auth UID)
├── productId: string
├── productTitle: string
├── status: string (active | paused | cancelled)
├── plan: string (monthly | quarterly | annual)
├── amount: number (KES per billing cycle)
├── billingCycle: number (days between charges)
├── nextBillingDate: timestamp
├── autoRenew: boolean
├── createdAt: timestamp
├── updatedAt: timestamp
├── cancelledAt: timestamp (null unless cancelled)
└── metadata: object
```

---

### 9. **coupons** — Discount Codes (Promotions)
Reusable or single-use discount codes.

```
coupons/{couponId}
├── code: string (unique, e.g., WELCOME10)
├── type: string (percentage | fixed)
├── value: number (10 for 10% off, or 500 for KES 500 off)
├── maxUses: number (null for unlimited)
├── usedCount: number
├── applicableTo: array<string> (product categories or IDs; empty = all)
├── minOrderAmount: number (minimum order to apply)
├── expiresAt: timestamp (null for no expiry)
├── status: string (active | inactive | expired)
├── createdAt: timestamp
└── metadata: object
```

---

### 10. **notifications** — User Notifications (Alerts & Updates)
Tracks all notifications sent to users (email, SMS, in-app, WhatsApp).

```
notifications/{notificationId}
├── customerId: string (Firebase Auth UID)
├── type: string (order_confirmation | payment_received | download_ready | service_update | promotion | system)
├── channels: array<string> (email | sms | whatsapp | in_app)
├── subject: string
├── message: string
├── relatedOrderId: string (reference to orders/{orderId}, if applicable)
├── read: boolean
├── readAt: timestamp (null if unread)
├── createdAt: timestamp
├── sentAt: timestamp
└── metadata: object
```

---

### 11. **supportTickets** — Support Requests (Customer Service)
Tracks customer support inquiries and resolutions.

```
supportTickets/{ticketId}
├── customerId: string (Firebase Auth UID)
├── orderId: string (reference to orders/{orderId}, if applicable)
├── subject: string
├── description: string
├── category: string (billing | technical | product | other)
├── priority: string (low | medium | high | urgent)
├── status: string (open | in_progress | waiting_customer | resolved | closed)
├── assignedTo: string (staff member UID, null if unassigned)
├── messages: array<object>
│   ├── sender: string (customer | staff)
│   ├── message: string
│   ├── attachments: array<string> (URLs)
│   └── createdAt: timestamp
├── createdAt: timestamp
├── updatedAt: timestamp
├── resolvedAt: timestamp (null until resolved)
└── metadata: object
```

---

### 12. **users** — Customer Profiles (Existing, Extended)
Existing collection, extended with new fields for Phase 1.

```
users/{userId}  // Firebase Auth UID
├── email: string
├── phone: string
├── firstName: string
├── lastName: string
├── name: string (full name)
├── avatar: string (profile picture URL)
├── isAdmin: boolean (false by default)
├── role: string (customer | staff | admin)
├── status: string (active | inactive | suspended)
├── preferences: object
│   ├── emailNotifications: boolean
│   ├── smsNotifications: boolean
│   ├── whatsappNotifications: boolean
│   └── darkMode: boolean
├── stats: object
│   ├── totalOrders: number
│   ├── totalSpent: number
│   └── joinedAt: timestamp
├── createdAt: timestamp
├── updatedAt: timestamp
└── metadata: object
```

---

## Relationships & Queries

### Common Query Patterns

**1. Get all orders for a customer:**
```
db.collection("orders").where("customerId", "==", userId).orderBy("createdAt", "desc")
```

**2. Get all downloads for a customer:**
```
db.collection("downloads").where("customerId", "==", userId).orderBy("createdAt", "desc")
```

**3. Get all active services for a customer:**
```
db.collection("services").where("customerId", "==", userId).where("status", "!=", "completed").orderBy("createdAt", "desc")
```

**4. Get all paid orders (for admin revenue):**
```
db.collection("orders").where("status", "==", "paid").orderBy("createdAt", "desc")
```

**5. Get all open support tickets:**
```
db.collection("supportTickets").where("status", "!=", "closed").orderBy("createdAt", "desc")
```

---

## Firestore Security Rules (Complete)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuth() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuth() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    function isOwner(userId) {
      return isAuth() && request.auth.uid == userId;
    }

    // Products — readable if active, writable by admin only
    match /products/{productId} {
      allow read: if resource.data.status == "active";
      allow write: if isAdmin();
    }

    // Orders — readable by owner or admin, writable by backend only
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin() || true; // Allow public read for status polling
      allow write: if false; // Backend writes via Admin SDK
    }

    // Payments — readable by owner or admin, writable by backend only
    match /payments/{paymentId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin();
      allow write: if false; // Backend writes via Admin SDK
    }

    // Downloads — readable by owner, writable by backend only
    match /downloads/{downloadId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin();
      allow write: if false; // Backend writes via Admin SDK
    }

    // Services — readable by owner or assigned staff or admin, writable by admin
    match /services/{serviceId} {
      allow read: if isOwner(resource.data.customerId) || isOwner(resource.data.assignedStaff) || isAdmin();
      allow write: if isAdmin();
    }

    // Invoices — readable by owner or admin
    match /invoices/{invoiceId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin();
      allow write: if isAdmin();
    }

    // Refunds — readable by owner or admin
    match /refunds/{refundId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin();
      allow write: if isAdmin();
    }

    // Subscriptions — readable by owner or admin
    match /subscriptions/{subscriptionId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin();
      allow write: if isAdmin();
    }

    // Coupons — readable by all (for validation)
    match /coupons/{couponId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Notifications — readable by owner or admin
    match /notifications/{notificationId} {
      allow read: if isOwner(resource.data.customerId) || isAdmin();
      allow write: if isAdmin();
    }

    // Support Tickets — readable by owner, assigned staff, or admin
    match /supportTickets/{ticketId} {
      allow read: if isOwner(resource.data.customerId) || isOwner(resource.data.assignedTo) || isAdmin();
      allow write: if isAuth(); // Customers can create; staff/admin can update
    }

    // Users — readable by self or admin, writable by self or admin
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isOwner(userId) || isAdmin();
    }

    // Legacy collections (existing, untouched)
    match /transactions/{transactionId} {
      allow read, write: if isAdmin();
    }

    match /cyber_notify/{docId} {
      allow read, write: if true;
    }
  }
}
```

---

## Migration Notes

1. **Existing Collections Preserved:** `transactions`, `users`, `cyber_notify` remain unchanged.
2. **New Collections Auto-Created:** `orders`, `payments`, `downloads`, `services`, `products`, `invoices`, `refunds`, `subscriptions`, `coupons`, `notifications`, `supportTickets` are created on first write.
3. **Indexes:** Firestore will suggest composite indexes for complex queries; create them as prompted.
4. **Backups:** Enable automated backups before going live.

---

## Next Steps

1. Deploy Firestore rules to production.
2. Seed `products` collection with initial catalog.
3. Test order → payment → fulfillment flow end-to-end.
4. Build admin UI for product management and order fulfillment.
5. Implement customer dashboard tabs (Orders, Downloads, Services, Invoices, Support).
