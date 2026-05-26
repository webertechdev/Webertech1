// src/pages/Electronics.jsx
import ComingSoon from "./ComingSoon";
export default function Electronics() {
  return (
    <ComingSoon
      emoji="📱"
      title="WeberTech Electronics"
      subtitle="Get notified when our store goes live."
      description="Quality smartphones, accessories, gadgets & more — delivered across Kenya. Affordable prices, genuine products, M-PESA payments."
      firestoreCollection="electronics_notify"
      fields={["name","email","phone"]}
      buttonLabel="Notify Me"
      accentColor="#7c3aed"
      accentBg="#ede9fe"
      gradient="linear-gradient(135deg,#0f172a,#2e1065,#7c3aed)"
      features={[
        "Smartphones & tablets",
        "Accessories & cables",
        "Genuine products only",
        "M-PESA payments accepted",
        "Delivery across Kenya",
      ]}
    />
  );
}
