import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaMobileAlt, FaBolt, FaLock, FaHeadset, FaBars, FaTimes, FaUser, FaSignOutAlt, FaGoogle } from "react-icons/fa";

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
  { q: "Can I buy bundles for another number?", a: "Yes! Just enter the recipient's Safaricom number in the 'Receiving Number' field. The bundle will be sent directly to them." },
];

export default function Bundles() {
  const [receivingNumber, setReceivingNumber] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authTab, setAuthTab] = useState('login');
  const [txnId, setTxnId] = useState("");
  const [txnResult, setTxnResult] = useState(null);

  const initiateStkPush = async (bundle, price, type) => {
    if (!/^(\+254|254|0)?7\d{8}$/.test(receivingNumber)) {
      toast.error("Weka namba sahihi ya kupokea bundle: 07XXXXXXXX");
      return;
    }
    if (!/^(\+254|254|0)?7\d{8}$/.test(mpesaNumber)) {
      toast.error("Weka namba sahihi ya M-PESA: 07XXXXXXXX");
      return;
    }
    if (!user) {
      toast.error("Tafadhali Login kwanza");
      setAuthModalOpen(true);
      return;
    }
    setLoading(true);
    toast.loading(`Sending KES ${price} STK to ${mpesaNumber} for ${receivingNumber}...`);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${bundle} ${type} sent to ${receivingNumber}! Check M-PESA on ${mpesaNumber}`);
      setReceivingNumber("");
      setMpesaNumber("");
    }, 3000);
  };

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

  const trackOrder = () => {
    const txn = mockTransactions.find(t => t.id === txnId);
    setTxnResult(txn || { error: "Transaction not found" });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const BundleCard = ({ bundle, type }) => (
    <div className="bg-white rounded-xl shadow-md p-6 text-center bundle-card hover:-translate-y-1 hover:shadow-xl transition">
      <div className="text-3xl font-bold text-primary">{bundle.size}</div>
      <div className="text-lg">{bundle.time}</div>
      <div className="mt-2">KES {bundle.price}</div>
      <button 
        onClick={() => initiateStkPush(bundle.size, bundle.price, type)}
        disabled={loading}
        className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );

  return (
    <>
      <Toaster position="top-center" />
      {/* Navigation - FIXED */}
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
            <button onClick={() => {setActiveTab('home'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Home</button>
            <button onClick={() => {setActiveTab('buy-data'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Buy Data</button>
            <button onClick={() => {setActiveTab('buy-minutes'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Buy Minutes</button>
            <button onClick={() => {setActiveTab('buy-sms'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Buy SMS</button>
            <button onClick={() => {setActiveTab('track-order'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Track Order</button>
            <button onClick={() => {setActiveTab('support'); setMobileMenuOpen(false)}} className="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Support</button>
            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <>
                  <button className="block w-full mt-2 flex items-center justify-center text-gray-600">
                    <FaUser className="mr-2" />
                    <span>{getGreeting()}, {user.name}</span>
                  </button>
                  <button onClick={logout} className="block w-full mt-2 flex items-center justify-center text-gray-600 hover:text-primary nav-link">
                    <FaSignOutAlt className="mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button onClick={() => {setAuthModalOpen(true); setMobileMenuOpen(false)}} className="block w-full mt-2 flex items-center justify-center text-gray-600 hover:text-primary nav-link">
                  <FaUser className="mr-2" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <button onClick={() => setAuthModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="mb-4">
              <button onClick={() => setAuthTab('login')} className={`w-full py-3 mb-3 rounded-md font-semibold ${authTab === 'login' ? 'bg-primary text-white' : 'border border-primary text-primary'}`}>Login with Email</button>
              <button onClick={() => setAuthTab('signup')} className={`w-full py-3 rounded-md font-semibold ${authTab === 'signup' ? 'bg-primary text-white' : 'border border-primary text-primary'}`}>Sign Up</button>
              <button onClick={googleSignIn} className="w-full py-3 mt-2 flex items-center justify-center border border-primary text-primary rounded-md font-semibold hover:bg-green-50">
                <FaGoogle className="mr-2" /> Sign Up with Google
              </button>
            </div>
            {authTab === 'login' && (
              <div>
                <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <button onClick={handleLogin} className="w-full py-3 bg-primary text-white rounded-md font-semibold hover:bg-secondary">Login</button>
                <div className="mt-4 text-center">
                  <button onClick={() => setAuthTab('forgot')} className="text-primary hover:underline">Forgot Password?</button>
                </div>
              </div>
            )}
            {authTab === 'signup' && (
              <div>
                <input type="text" placeholder="First Name" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <input type="text" placeholder="Last Name" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <button onClick={handleSignup} className="w-full py-3 bg-primary text-white rounded-md font-semibold hover:bg-secondary">Sign Up</button>
              </div>
            )}
            {authTab === 'forgot' && (
              <div>
                <p className="text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
                <button className="w-full py-3 bg-primary text-white rounded-md font-semibold hover:bg-secondary">Send Reset Link</button>
                <div className="mt-4 text-center">
                  <button onClick={() => setAuthTab('login')} className="text-primary hover:underline">Back to Login</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Google Signup Modal */}
      {googleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text