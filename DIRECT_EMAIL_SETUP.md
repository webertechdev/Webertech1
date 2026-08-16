# WeberTech Direct Email Setup

The Admin Control Center sends email through the server-side endpoint at `/api/send-email`. The browser never receives the Resend API key and the Email button does not open `mailto:`, Gmail, Outlook, or another email application.

## Vercel environment variables

Add these variables in the Vercel project settings for the Production environment:

```text
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Use a verified WeberTech sender address when the domain is verified in Resend. The `onboarding@resend.dev` sender is suitable only for the initial Resend test and may have provider restrictions.

The server also needs Firebase Admin credentials to verify that the signed-in user is an administrator. Configure these server-only variables in Vercel:

```text
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_admin_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

`FIREBASE_PRIVATE_KEY` must be stored as one Vercel value with the newline characters represented as `\\n`. Do not add any of these server-only values to the frontend `VITE_` variables, source code, GitHub, or chat.

## Sending flow

An authenticated administrator edits the subject and message in the Admin → Requests Email composer and clicks **Send Email**. The browser sends an authenticated request to `/api/send-email`; the server verifies the Firebase ID token and checks the `users/{uid}` document for `role: "admin"` before calling Resend.

The selected customer email comes from the Firestore request record. After Resend accepts the message, the request is marked `contacted`. If authentication, validation, configuration, Resend, or network handling fails, the request is not marked as contacted and the dashboard shows an error.

## Provider limits

Resend free-plan quotas and sender restrictions are controlled by Resend and may change. If Resend returns a rate-limit response, WeberTech reports that the limit was reached and does not mark the customer as contacted.

## WhatsApp

WhatsApp behavior is intentionally unchanged by the direct-email implementation.
