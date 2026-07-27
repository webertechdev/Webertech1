// src/pages/AdminShowcase.jsx
// Public-facing showcase of WeberTech Admin Panel capabilities
// Highlight features, benefits, and real-time control

import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminShowcase() {
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    {
      icon: "⚡",
      title: "Real-time Command Center",
      desc: "Control every module (Cyber, Academy, Electronics, Bundles, Dev, Hustle) from one unified dashboard with instant updates.",
    },
    {
      icon: "💬",
      title: "Live Chat Monitoring",
      desc: "Monitor all customer conversations with WeberAI. Take over chats instantly and provide human support when needed.",
    },
    {
      icon: "🤖",
      title: "AI Training Hub",
      desc: "Update WeberAI's knowledge base in real-time. Add new services, pricing, or instructions—AI learns instantly.",
    },
    {
      icon: "📊",
      title: "Automated Daily Reports",
      desc: "AI-generated summaries of platform activity, revenue, customer interactions, and actionable insights delivered daily.",
    },
    {
      icon: "📋",
      title: "Order Management",
      desc: "Bulk update order statuses, track fulfillment, and manage customer orders across all modules in one place.",
    },
    {
      icon: "📈",
      title: "Module Analytics",
      desc: "Deep dive into each module's performance: total orders, revenue, pending items, and completion rates.",
    },
    {
      icon: "🔐",
      title: "Role-based Access",
      desc: "Secure admin authentication. Only verified admins can access the Command Center and make platform changes.",
    },
    {
      icon: "🔄",
      title: "Instant Sync",
      desc: "Every action updates across the platform instantly. No delays, no manual refreshes—everything is live.",
    },
  ];

  const benefits = [
    {
      title: "Total Control",
      items: [
        "Manage all 6 modules from one dashboard",
        "Instant order status updates",
        "Real-time customer support takeover",
        "AI knowledge base updates on-the-fly",
      ],
    },
    {
      title: "Data-Driven Insights",
      items: [
        "Daily AI-generated platform reports",
        "Module-by-module performance breakdown",
        "Revenue tracking and analytics",
        "Customer interaction patterns",
      ],
    },
    {
      title: "Scalability",
      items: [
        "Support unlimited customers",
        "Handle high order volumes",
        "Automated reporting at scale",
        "Real-time performance monitoring",
      ],
    },
    {
      title: "Security",
      items: [
        "Firebase authentication",
        "Role-based access control",
        "Encrypted data transmission",
        "Audit logs for all actions",
      ],
    },
  ];

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        .showcase-hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); padding: 80px 20px; text-align: center; color: #fff; }
        .showcase-hero h1 { font-size: 48px; font-weight: 900; margin: 0 0 16px; letter-spacing: -1px; }
        .showcase-hero p { font-size: 18px; color: rgba(255,255,255,0.7); margin: 0 0 32px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .showcase-cta { display: inline-flex; gap: 12px; }
        .btn-primary { background: #16a34a; color: #fff; border: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; cursor: pointer; text-decoration: none; transition: all .2s; }
        .btn-primary:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.4); }
        .btn-secondary { background: transparent; color: #4ade80; border: 2px solid #4ade80; padding: 12px 28px; border-radius: 10px; font-weight: 700; cursor: pointer; text-decoration: none; transition: all .2s; }
        .btn-secondary:hover { background: rgba(74,222,128,0.1); }
        .showcase-section { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        .showcase-section h2 { font-size: 36px; font-weight: 900; color: #0f172a; margin: 0 0 48px; text-align: center; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .feature-card { background: #fff; border: 2px solid #e5e7eb; border-radius: 16px; padding: 32px; text-align: center; transition: all .3s; }
        .feature-card:hover { border-color: #16a34a; box-shadow: 0 12px 32px rgba(22,163,74,0.15); transform: translateY(-4px); }
        .feature-icon { font-size: 48px; margin-bottom: 16px; }
        .feature-title { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 12px; }
        .feature-desc { font-size: 14px; color: #6b7280; line-height: 1.6; }
        .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
        .benefit-box { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #16a34a; border-radius: 16px; padding: 28px; }
        .benefit-title { font-size: 18px; font-weight: 800; color: #15803d; margin: 0 0 16px; }
        .benefit-list { list-style: none; padding: 0; margin: 0; }
        .benefit-list li { padding: 8px 0; color: #166534; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .benefit-list li:before { content: "✓"; font-weight: 900; color: #16a34a; }
        .tabs { display: flex; gap: 12px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap; }
        .tab-btn { background: #e5e7eb; color: #1f2937; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .tab-btn.active { background: #16a34a; color: #fff; }
        .tab-btn:hover { background: #16a34a; color: #fff; }
        .showcase-demo { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #16a34a; border-radius: 16px; padding: 40px; text-align: center; }
        .showcase-demo h3 { color: #15803d; font-size: 24px; margin: 0 0 16px; }
        .showcase-demo p { color: #166534; font-size: 16px; margin: 0 0 24px; }
        @media (max-width: 768px) { .showcase-hero h1 { font-size: 32px; } .showcase-section h2 { font-size: 24px; } }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <div className="showcase-hero">
        <h1>WeberTech Command Center</h1>
        <p>Total platform control, real-time monitoring, and AI-powered insights—all in one unified dashboard.</p>
        <div className="showcase-cta">
          <Link to="/admin" className="btn-primary">Access Command Center</Link>
          <a href="#features" className="btn-secondary">Learn More</a>
        </div>
      </div>

      {/* Features Section */}
      <div className="showcase-section" id="features">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="showcase-section" style={{ background: "#f9fafb" }}>
        <h2>Why Admins Love It</h2>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-box">
              <h3 className="benefit-title">{b.title}</h3>
              <ul className="benefit-list">
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="showcase-section">
        <h2>How It Works</h2>
        <div className="tabs">
          <button className={`tab-btn ${activeTab === "features" ? "active" : ""}`} onClick={() => setActiveTab("features")}>
            🎯 Features
          </button>
          <button className={`tab-btn ${activeTab === "workflow" ? "active" : ""}`} onClick={() => setActiveTab("workflow")}>
            🔄 Workflow
          </button>
          <button className={`tab-btn ${activeTab === "pricing" ? "active" : ""}`} onClick={() => setActiveTab("pricing")}>
            💰 Pricing
          </button>
        </div>

        {activeTab === "features" && (
          <div style={{ background: "#fff", border: "2px solid #e5e7eb", borderRadius: 16, padding: 32 }}>
            <h3 style={{ color: "#0f172a", marginTop: 0 }}>Complete Module Control</h3>
            <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
              The Command Center gives you instant access to manage all 6 WeberTech modules: Cyber Division, Academy, Electronics, Bundles, Dev Services, and Hustle KE. Update order statuses, track revenue, monitor customer support, and train WeberAI—all from one dashboard.
            </p>
            <ul style={{ color: "#1f2937", lineHeight: 2 }}>
              <li>✅ Real-time order management across all modules</li>
              <li>✅ Live customer support chat monitoring and takeover</li>
              <li>✅ AI training hub for instant knowledge updates</li>
              <li>✅ Automated daily reports with actionable insights</li>
            </ul>
          </div>
        )}

        {activeTab === "workflow" && (
          <div style={{ background: "#fff", border: "2px solid #e5e7eb", borderRadius: 16, padding: 32 }}>
            <h3 style={{ color: "#0f172a", marginTop: 0 }}>Admin Workflow</h3>
            <ol style={{ color: "#1f2937", lineHeight: 2, paddingLeft: 20 }}>
              <li><strong>Login</strong> to your admin account (role: "admin" in Firestore)</li>
              <li><strong>Access</strong> the Command Center from the Navbar</li>
              <li><strong>Select</strong> a module to view real-time stats and orders</li>
              <li><strong>Manage</strong> orders: update status, track fulfillment</li>
              <li><strong>Monitor</strong> customer chats and take over if needed</li>
              <li><strong>Train</strong> WeberAI by updating the knowledge base</li>
              <li><strong>Review</strong> daily reports for insights and trends</li>
            </ol>
          </div>
        )}

        {activeTab === "pricing" && (
          <div style={{ background: "#fff", border: "2px solid #e5e7eb", borderRadius: 16, padding: 32 }}>
            <h3 style={{ color: "#0f172a", marginTop: 0 }}>Included in Your Platform</h3>
            <p style={{ color: "#6b7280", lineHeight: 1.8 }}>
              The WeberTech Command Center is built into your platform at no additional cost. All admin features, real-time monitoring, chat management, and AI training are included with your WeberTech subscription.
            </p>
            <div className="showcase-demo">
              <h3>Ready to Take Control?</h3>
              <p>Your admin account is already set up. Just log in and access the Command Center.</p>
              <Link to="/admin" className="btn-primary">Go to Command Center</Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
