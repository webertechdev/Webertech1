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
      {/* NAV - FIXED: Nimefunga divs vizuri hapa chini */}
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

      {googleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Registration</h2>
              <button onClick={() => setGoogleModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">We need additional information to complete your registration.</p>
            <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-primary" />
            <button onClick={completeGoogleSignup} className="w-full py-3 bg-primary text-white rounded-md font-semibold hover:bg-secondary">Verify & Continue</button>
          </div>
        </div>
      )}

      <div className="pt-16">
        {activeTab === 'home' && (
          <>
            <div className="relative bg-gradient-to-r from-primary to-secondary text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">Get Your Digital Bundles Instantly!</h1>
                    <p className="mt-4 text-lg opacity-90">Safaricom Data, Minutes & SMS bundles delivered in seconds. No waiting, no hassle.</p>
                    <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button onClick={() => setActiveTab('buy-data')} className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">Buy Data Now</button>
                      <button onClick={() => setActiveTab('buy-minutes')} className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition duration-300">Buy Minutes</button>
                      <button onClick={() => setActiveTab('buy-sms')} className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition duration-300">Buy SMS</button>
                    </div>
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 bg-white bg-opacity-20 rounded-full absolute -top-4 -left-4 animate-pulse"></div>
                      <div className="w-64 h-64 bg-white bg-opacity-10 rounded-full absolute -bottom-4 -right-4 animate-pulse"></div>
                      <div className="relative bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-30">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold">1GB</div>
                            <div className="text-sm opacity-80">Data</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">50</div>
                            <div className="text-sm opacity-80">Minutes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">200</div>
                            <div className="text-sm opacity-80">SMS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900">Why Choose Webertech Bingwa?</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Experience seamless digital bundle purchasing with our automated platform</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <FaBolt className="text-primary text-2xl" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Instant Delivery</h3>
                    <p className="mt-2 text-gray-600">Receive your bundles within seconds of payment confirmation</p>
                  </div>
                  <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <FaLock className="text-primary text-2xl" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Secure Payments</h3>
                    <p className="mt-2 text-gray-600">M-PESA STK Push with end-to-end encryption and security</p>
                  </div>
                  <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <FaHeadset className="text-primary text-2xl" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">24/7 Support</h3>
                    <p className="mt-2 text-gray-600">Round-the-clock customer support for all your queries</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'buy-data' && (
          <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Bingwa Sokoni Data Bundles</h1>
                <p className="text-gray-600">Instant Safaricom Data. Okoa Jahazi inafanya.</p>
              </div>
              <div className="max-w-md mx-auto mb-10 space-y-4">
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX - Namba ya Kupokea Bundle" 
                  value={receivingNumber}
                  onChange={(e) => setReceivingNumber(e.target.value)}
                  className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX - Namba ya M-PESA Kulipa" 
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {dataBundles.map((b) => (
                  <BundleCard key={b.size} bundle={b} type="Data" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buy-minutes' && (
          <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Bingwa Sokoni Minutes</h1>
                <p className="text-gray-600">Ongea bila stress. Minutes pap!</p>
              </div>
              <div className="max-w-md mx-auto mb-10 space-y-4">
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX - Namba ya Kupokea Minutes" 
                  value={receivingNumber}
                  onChange={(e) => setReceivingNumber(e.target.value)}
                  className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX - Namba ya M-PESA Kulipa" 
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {minutesBundles.map((b) => (
                  <BundleCard key={b.size} bundle={b} type="Minutes" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buy-sms' && (
          <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Bingwa Sokoni SMS</h1>
                <p className="text-gray-600">SMS mob. Chat na wote.</p>
              </div>
              <div className="max-w-md mx-auto mb-10 space-y-4">
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX - Namba ya Kupokea SMS" 
                  value={receivingNumber}
                  onChange={(e) => setReceivingNumber(e.target.value)}
                  className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX - Namba ya M-PESA Kulipa" 
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {smsBundles.map((b) => (
                  <BundleCard key={b.size} bundle={b} type="SMS" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'track-order' && (
          <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
            <input 
              type="text" 
              placeholder="Enter Transaction Reference e.g BINGWA_0001" 
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              className="w-full p-4 border rounded-lg mb-4"
            />
            <button onClick={trackOrder} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary">Track</button>
            {txnResult && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow">
                {txnResult.error ? (
                  <p className="text-red-500">{txnResult.error}</p>
                ) : (
                  <>
                    <p><strong>Transaction ID:</strong> {txnResult.id}</p>
                    <p><strong>Status:</strong> <span className={txnResult.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>{txnResult.status}</span></p>
                    <p><strong>Amount:</strong> {txnResult.amount}</p>
                    <p><strong>Date:</strong> {txnResult.date}</p>
                  </>
                )}
              </div>
            )}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
              {mockTransactions.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between">
                  <div>
                    <p className="font-semibold">{t.id}</p>
                    <p className="text-sm text-gray-500">{t.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{t.amount}</p>
                    <p className={t.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>{t.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Support Center</h1>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-lg shadow mb-4 p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-primary">support@webertech.co.ke</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-primary">+254 700 000 000</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-primary">+254 700 000 000</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}