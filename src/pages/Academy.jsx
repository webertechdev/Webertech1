// src/pages/Academy.jsx
import ComingSoon from "./ComingSoon";
export default function Academy() {
  return <ComingSoon emoji="🎓" title="WeberTech Academy" subtitle="Be first to enroll when we launch." description="Master digital skills — web development, graphic design, digital marketing & more. Earn certificates and build your freelance career." firestoreCollection="academy_waitlist" fields={["name","email","phone"]} buttonLabel="Join Waitlist" accentColor="#d97706" accentBg="#fef3c7" gradient="linear-gradient(135deg,#0f172a,#451a03,#92400e)" features={["Web development & app building","Graphic design & branding","Digital marketing & social media","Earn while you learn — real projects","Certificate of completion"]} />;
}
