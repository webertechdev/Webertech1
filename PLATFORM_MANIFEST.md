# WeberTech Platform Manifest

## Core Infrastructure
- **Base URL**: https://webertech.co.ke
- **Tech Stack**: React, Vite, Firebase (Auth, Firestore, Storage), Vercel
- **Payments**: NestLink (M-PESA), IntaSend (Card/M-PESA)
- **AI**: WeberAI (Gemini-powered) with PDF generation

## Key Integrations
- **NestLink API Key**: 1c95194c7479d48be0229c61
- **NestLink Base URL**: https://api.nestlink.co.ke
- **NestLink Webhook**: https://webertech.co.ke/api/payments/nestlink-webhook

## User Roles
- **FIDELIS**: Admin (role: "admin", email: kiokofidelismusyoka@gmail.com)

## Critical Files
- `api/_lib/firebaseAdmin.js`: Serverless Firebase init
- `api/_lib/orders.js`: Order fulfillment logic
- `src/pages/ChatWidgetEnhanced.jsx`: WeberAI UI
- `src/pages/AdminEnhanced.jsx`: Platform control center
