// src/pages/Dev.jsx
import ComingSoon from "./ComingSoon";
export default function Dev() {
  return (
    <ComingSoon
      emoji="💻"
      title="WeberTech Dev"
      subtitle="Tell us what you need built."
      description="Custom websites, web apps, mobile apps, e-commerce stores & business systems — built by WeberTech's team at affordable Kenyan rates."
      firestoreCollection="dev_inquiries"
      fields={["name","email","phone"]}
      buttonLabel="Request a Quote"
      accentColor="#0891b2"
      accentBg="#cffafe"
      gradient="linear-gradient(135deg,#0f172a,#0c4a6e,#0891b2)"
      features={[
        "Business websites & portfolios",
        "E-commerce & online stores",
        "Mobile apps (Android & iOS)",
        "Custom management systems",
        "Affordable Kenyan pricing",
      ]}
    />
  );
}
