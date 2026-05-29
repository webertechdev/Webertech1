// src/pages/Cyber.jsx
import ComingSoon from "./ComingSoon";
export default function Cyber() {
  return <ComingSoon emoji="🖨" title="WeberTech Cyber" subtitle="Be first to know when we open." description="Professional printing, scanning, photocopying, internet access & digital services — all under one roof at WeberTech Cyber." firestoreCollection="cyber_notify" fields={["name","email"]} buttonLabel="Notify Me" accentColor="#dc2626" accentBg="#fee2e2" gradient="linear-gradient(135deg,#0f172a,#450a0a,#dc2626)" features={["Colour & B&W printing","Document scanning & PDF","Fast internet access","Lamination & binding","Passport photo printing"]} />;
}
