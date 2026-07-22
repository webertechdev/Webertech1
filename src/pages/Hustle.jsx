// src/pages/Hustle.jsx
import ComingSoon from "./ComingSoon";
export default function Hustle() {
  return <ComingSoon emoji="🔥" title="WeberTech Hustle" subtitle="Join Kenya's digital hustle community." description="Side hustles, reseller opportunities, affiliate programs & digital income streams — curated by WeberTech to help Kenyans earn online." firestoreCollection="hustle_waitlist" fields={["name","email","phone"]} buttonLabel="Join the Hustle" accentColor="#ea580c" accentBg="#ffedd5" gradient="linear-gradient(135deg,#0f172a,#431407,#ea580c)" features={["Bundle reseller program","Affiliate commissions","Digital product sales","Online gig opportunities","Weekly payouts via M-PESA"]} />;
}
