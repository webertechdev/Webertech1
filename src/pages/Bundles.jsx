import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaMobileAlt, FaBolt, FaLock, FaHeadset, FaBars, FaTimes, FaUser, FaSignOutAlt, FaGoogle } from "react-icons/fa";

// --- DATA YAKO YOTE ---
const dataBundles = [
  { size: "1GB", time: "1hr", price: 19 },
  { size: "1.5GB", time: "3hr", price: 49 },
  { size: "2GB", time: "24hr", price: 99 },
  { size: "6GB", time: "7days", price: 349 },
  { size: "1.2GB", time: "30days", price: 250 },
  { size: "2.5GB", time: "30days", price: 300 },
  { size: "5.5GB", time: "30days", price: 500 },
  { size: "10GB", time: "30days", price: 1000 },
];

const minutesBundles = [
  { size: "50 Mins", time: "3hr", price: 20 },
  { size: "100 Mins", time: "24hr", price: 50 },
  { size: "200 Mins", time: "7days", price: 100 },
  { size: "500 Mins", time: "30days", price: 250 },
];

const smsBundles = [
  { size: "200 SMS", time: "24hr", price: 9 },
  { size: "500 SMS", time: "7days", price: 20 },
  { size: "1000 SMS", time: "30days", price: 30 },
  { size: "2000 SMS", time: "30days", price: 50 },
];

const mockTransactions = [
  { id: "BINGWA_0001", status: "Completed", amount: "KES 19", date: "2026-05-12" },
  { id: "BINGWA_0002", status: "Processing", amount: "KES 50", date: "2026-05-11" },
];

const faqs = [
  { q: "How long does it take to receive my bundle?", a: "Bundles are delivered instantly. You'll receive an M-PESA confirmation SMS within 10 seconds of payment." },
  { q: "What if I don't receive my bundle?", a: "Contact us immediately via WhatsApp +254 700 000 000 with your transaction ID. We resolve 99% of issues in under 5 minutes." },
  { q: "Can I buy bundles for another number?", a: "Yes! Just enter the recipient's Safaricom number in the phone field. The bundle will be sent directly to them." },
];

export default function Bundles() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // home, buy-data, buy-minutes, buy-sms, track-order, support
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Mock user - badaye Firebase
  const [authTab, setAuthTab] = useState('login'); // login, signup, forgot
  const [txnId, setTxnId] = useState("");
  const [txnResult, setTxnResult] = useState(null);

  // STK Push Logic
  const initiateStkPush = async (bundle, price, type) => {
    if (!/^(\+254|254|0)?7\d{8}$/.test(phone)) {
      toast.error("Weka namba ya Safaricom: 07XXXXXXXX");
      return;
    }
    if (!user) {
      toast.error("Tafadhali Login kwanza");
      setAuthModalOpen(true);
      return;
    }
    setLoading(true);
    toast.loading(`Sending KES ${price} STK to ${phone}...`);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${bundle} ${type} sent! Check M-PESA`);
    }, 3000);
  };

  // Mock Auth Functions
  const handleLogin = () => {
    setUser({ name: "Bingwa" });
    setAuthModalOpen(false);
    toast.success("Logged in! Good Morning, Bingwa");
  };

  const handleSignup = () => {
    setUser({ name: "Bingwa" });
    setAuthModalOpen(false);
    toast.success("Account created! Welcome Bingwa");
  };

  const googleSignIn = () => {
    setAuthModalOpen(false);
    setGoogleModalOpen(true);
  };

  const completeGoogleSignup = () => {
    setUser({ name: "Bingwa" });
    setGoogleModalOpen(false);
    toast.success("Google Sign Up complete!");
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out");
  };

  // Track Order
  const trackOrder = () => {
    const txn = mockTransactions.find(t => t.id === txnId);
    setTxnResult(txn || { error: "Transaction not found" });
  };

  // Time Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <Toaster position="top-center" />
      {/* Navigation - Kutoka HTML yako */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <FaMobileAlt className="text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Webertech Bingwa</span>
              </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setActiveTab('home')} className="text-gray-600 hover:text-primary nav-link">Home</button>
              <button onClick={() => setActiveTab('buy-data')} className="text-gray-600 hover:text-primary nav-link">Buy Data</button>
              <button onClick={() => setActiveTab('buy-minutes')} className="text-gray-600 hover:text-primary nav-link">Buy Minutes</button>
              <button onClick={() => setActiveTab('buy-sms')} className="text-gray-600 hover:text-primary nav-link">Buy SMS</button>
              <button onClick={() => setActiveTab('track-order')} className="text-gray-600 hover:text-primary nav-link">Track Order</button>
              <button onClick={() => setActiveTab('support')} className="text-gray-600 hover:text-primary nav-link">Support</button>
              <div className="flex items-center">
                {user ? (
                  <>
                    <button className="flex items-center text-gray-600 hover:text-primary nav-link">
                      <FaUser className="mr-1" />
                      <span>{getGreeting()}, {user.name}</span>
                    </button>
                    <button onClick={logout} className="ml-4 text-gray-600 hover:text-primary nav-link">
                      <FaSignOutAlt className="mr-1" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => setAuthModalOpen(true)} className="flex items-center text-gray-600 hover:text-primary nav-link">
                    <FaUser className="mr-1" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-primary">
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg fixed w-full z-10 top-16">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => {setActiveTab('home'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Home</