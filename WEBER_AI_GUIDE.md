# WeberAI — The Intelligent Platform Assistant

## Overview

WeberAI is the comprehensive intelligent assistant for the WeberTech platform. Unlike a basic support bot, WeberAI is deeply integrated into the platform's ecosystem, recognizing all services and providing advanced document generation capabilities directly within the chat interface.

---

## 🚀 Key Capabilities

### 1. Universal Service Recognition
WeberAI is trained to understand and assist with the entire WeberTech service catalog:
- **Safaricom Bundles**: Airtime, Bingwa, Okoa Jahazi, Data.
- **Cyber Division**: Legal documents, Government services (KRA, NTSA, eCitizen), Printing, and Professional Writing.
- **Academy**: Forex trading courses and mentorship.
- **Electronics**: Laptops, phones, and accessories.
- **Dev**: Software development and UI/UX design.
- **Hustle KE**: Startup packages for entrepreneurs.

### 2. Instant PDF Generation
WeberAI can generate professional PDF documents on demand. When a user asks to "write a letter" or "generate an invoice," WeberAI:
1.  Drafts the content in the chat.
2.  Provides a **"Download PDF"** button.
3.  Generates a professional, WeberTech-branded PDF using the `/api/generate-pdf` engine.

**Supported Document Types**:
- Business Letters
- Invoices
- Simple Contracts
- Professional CVs
- Service Proposals

### 3. Smart Query Resolution
- **Kenyan Context**: Understands Kenyan English and Swahili.
- **Problem Solving**: Guides users through complex government service applications.
- **Order Tracking**: Assists users in navigating their dashboard to find orders and downloads.

---

## 🛠️ Technical Architecture

### 1. AI Backend (`api/chat.js`)
- **Model**: Powered by Google Gemini (Flash 2.5).
- **System Prompt**: A comprehensive knowledge base of WeberTech services and strict interaction rules.
- **Tool Logic**: Detects document generation requests and injects `[GENERATE_PDF]` tags for the frontend to process.

### 2. PDF Engine (`api/generate-pdf.js`)
- **Technology**: Built using `jsPDF`.
- **Branding**: Automatically applies WeberTech Green header, professional typography, and official contact footer.
- **Security**: Base64 encoded transfer to prevent unauthorized file access.

### 3. Enhanced UI (`ChatWidgetEnhanced.jsx`)
- **Branding**: Official WeberAI persona with "Online & Ready" status.
- **Typing Indicators**: Real-time feedback for a human-like experience.
- **PDF Integration**: Custom renderers for PDF download buttons.
- **Session Management**: Persistent chat history via `sessionStorage`.

---

## 📖 Usage Guide

### How to ask for a PDF
Users can simply type:
- *"Generate a professional business letter for a job application"*
- *"Create an invoice for web development services for KES 50,000"*
- *"Write a simple car sale agreement"*

WeberAI will respond with the text and a download button.

### How to switch languages
The chat widget includes an **EN/SW** toggle at the top, allowing users to switch between English and Swahili instantly.

---

## 🔐 Security & Privacy

- **Data Isolation**: All chats are saved to Firestore under unique session IDs.
- **Authentication**: WeberAI recognizes logged-in users and links their chat history to their account.
- **Admin Takeover**: Admins can view live chats in the Admin Dashboard and take over from the AI if needed.

---

## 📈 Future Roadmap

- **Phase 3**: Integration with Weber Vault to auto-fill documents.
- **Phase 4**: Voice-to-text support for mobile users.
- **Phase 5**: AI-powered service recommendations based on user history.

---

**Version**: 1.0
**Status**: Production Ready
**Last Updated**: July 2024
