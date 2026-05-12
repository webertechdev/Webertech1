nice final bingwa sokoni webertech bundles working 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webertech Bingwa - Digital Bundle Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#10B981',
                        secondary: '#059669',
                        dark: '#0F172A',
                        light: '#F8FAFC'
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
        }
        .gradient-card {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        }
        .floating-btn {
            transition: all 0.3s ease;
        }
        .floating-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        .nav-link {
            position: relative;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #10B981;
            transition: width 0.3s ease;
        }
        .nav-link:hover::after {
            width: 100%;
        }
        .bundle-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .pulse {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background-color: white;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            padding: 2rem;
            position: relative;
            animation: modalFadeIn 0.3s ease-out;
        }
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .form-input {
            border: 1px solid #d1d5db;
            padding: 0.75rem;
            border-radius: 0.375rem;
            width: 100%;
            margin-bottom: 1rem;
        }
        .form-input:focus {
            outline: none;
            border-color: #10B981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        .btn-primary {
            background-color: #10B981;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            background-color: #059669;
        }
        .btn-secondary {
            background-color: transparent;
            color: #10B981;
            border: 1px solid #10B981;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-secondary:hover {
            background-color: rgba(16, 185, 129, 0.1);
        }
        .card {
            transition: all 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .time-greeting {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .time-greeting span {
            font-weight: 700;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md fixed w-full z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            <i class="fas fa-mobile-alt text-white"></i>
                        </div>
                        <span class="ml-2 text-xl font-bold text-gray-900">Webertech Bingwa</span>
                    </div>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <button onclick="showPage('home')" class="text-gray-600 hover:text-primary nav-link">Home</button>
                    <button onclick="showPage('buy-data')" class="text-gray-600 hover:text-primary nav-link">Buy Data</button>
                    <button onclick="showPage('buy-minutes')" class="text-gray-600 hover:text-primary nav-link">Buy Minutes</button>
                    <button onclick="showPage('buy-sms')" class="text-gray-600 hover:text-primary nav-link">Buy SMS</button>
                    <button onclick="showPage('track-order')" class="text-gray-600 hover:text-primary nav-link">Track Order</button>
                    <button onclick="showPage('support')" class="text-gray-600 hover:text-primary nav-link">Support</button>
                    <div class="flex items-center">
                        <button onclick="showLoggedInUser()" class="flex items-center text-gray-600 hover:text-primary nav-link">
                            <i class="fas fa-user mr-1"></i>
                            <span id="user-display-name">Login</span>
                        </button>
                        <button onclick="logout()" class="ml-4 text-gray-600 hover:text-primary nav-link hidden" id="logout-btn">
                            <i class="fas fa-sign-out-alt mr-1"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-button" class="text-gray-600 hover:text-primary">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <button onclick="showPage('home')" class="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Home</button>
            <button onclick="showPage('buy-data')" class="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Buy Data</button>
            <button onclick="showPage('buy-minutes')" class="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Buy Minutes</button>
            <button onclick="showPage('buy-sms')" class="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Buy SMS</button>
            <button onclick="showPage('track-order')" class="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Track Order</button>
            <button onclick="showPage('support')" class="block px-3 py-2 text-gray-600 hover:text-primary nav-link w-full text-left">Support</button>
            <div class="pt-2 border-t border-gray-200">
                <button onclick="showLoggedInUser()" class="block w-full mt-2 flex items-center justify-center text-gray-600 hover:text-primary nav-link">
                    <i class="fas fa-user mr-2"></i>
                    <span id="mobile-user-display-name">Login</span>
                </button>
                <button onclick="logout()" class="block w-full mt-2 flex items-center justify-center text-gray-600 hover:text-primary nav-link hidden" id="mobile-logout-btn">
                    <i class="fas fa-sign-out-alt mr-2"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Authentication Modal -->
    <div id="auth-modal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <button onclick="closeAuthModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="mb-4">
                <button id="login-tab" class="btn-primary w-full py-3 mb-3">Login with Email</button>
                <button id="signup-tab" class="btn-secondary w-full py-3">Sign Up</button>
                <button onclick="googleSignIn()" class="btn-secondary w-full py-3 mt-2 flex items-center justify-center">
                    <i class="fab fa-google mr-2"></i> Sign Up with Google
                </button>
            </div>
            
            <div id="login-form">
                <div class="mb-4">
                    <input type="email" id="login-email" placeholder="Email Address" class="form-input" required>
                </div>
                <div class="mb-4">
                    <input type="password" id="login-password" placeholder="Password" class="form-input" required>
                </div>
                <button onclick="handleLogin()" class="btn-primary w-full py-3">Login</button>
                <div class="mt-4 text-center">
                    <button onclick="showForgotPassword()" class="text-primary hover:underline">Forgot Password?</button>
                </div>
            </div>
            
            <div id="signup-form" style="display: none;">
                <div class="mb-4">
                    <input type="text" id="signup-firstname" placeholder="First Name" class="form-input" required>
                </div>
                <div class="mb-4">
                    <input type="text" id="signup-lastname" placeholder="Last Name" class="form-input" required>
                </div>
                <div class="mb-4">
                    <input type="email" id="signup-email" placeholder="Email Address" class="form-input" required>
                </div>
                <div class="mb-4">
                    <input type="tel" id="signup-phone" placeholder="Phone Number" class="form-input" required>
                </div>
                <div class="mb-4">
                    <input type="password" id="signup-password" placeholder="Password" class="form-input" required>
                </div>
                <button onclick="handleSignup()" class="btn-primary w-full py-3">Sign Up</button>
            </div>
            
            <div id="forgot-password-form" style="display: none;">
                <p class="text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                <div class="mb-4">
                    <input type="email" id="forgot-email" placeholder="Email Address" class="form-input" required>
                </div>
                <button onclick="sendResetLink()" class="btn-primary w-full py-3">Send Reset Link</button>
                <div class="mt-4 text-center">
                    <button onclick="backToLogin()" class="text-primary hover:underline">Back to Login</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Google Sign Up Modal -->
    <div id="google-signup-modal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Complete Your Registration</h2>
                <button onclick="closeGoogleSignupModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <p class="text-gray-600 mb-4">We need additional information to complete your registration.</p>
            <div class="mb-4">
                <input type="tel" id="google-phone" placeholder="Phone Number" class="form-input" required>
            </div>
            <button onclick="completeGoogleSignup()" class="btn-primary w-full py-3">Verify & Continue</button>
        </div>
    </div>

    <!-- Main Content Area -->
    <div id="content-area" class="pt-20">
        <!-- Home Page -->
        <div id="home-page" class="min-h-screen">
            <div class="relative bg-gradient-to-r from-primary to-secondary text-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 class="text-4xl md:text-5xl font-bold leading-tight">Get Your Digital Bundles Instantly!</h1>
                            <p class="mt-4 text-lg opacity-90">Safaricom Data, Minutes & SMS bundles delivered in seconds. No waiting, no hassle.</p>
                            <div class="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button onclick="showPage('buy-data')" class="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">Buy Data Now</button>
                                <button onclick="showPage('buy-minutes')" class="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition duration-300">Buy Minutes</button>
                                <button onclick="showPage('buy-sms')" class="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition duration-300">Buy SMS</button>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="relative">
                                <div class="w-64 h-64 bg-white bg-opacity-20 rounded-full absolute -top-4 -left-4 animate-pulse"></div>
                                <div class="w-64 h-64 bg-white bg-opacity-10 rounded-full absolute -bottom-4 -right-4 animate-pulse"></div>
                                <div class="relative bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-30">
                                    <div class="grid grid-cols-3 gap-4">
                                        <div class="text-center">
                                            <div class="text-3xl font-bold">1GB</div>
                                            <div class="text-sm opacity-80">Data</div>
                                        </div>
                                        <div class="text-center">
                                            <div class="text-3xl font-bold">50</div>
                                            <div class="text-sm opacity-80">Minutes</div>
                                        </div>
                                        <div class="text-center">
                                            <div class="text-3xl font-bold">200</div>
                                            <div class="text-sm opacity-80">SMS</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-gray-900">Why Choose Webertech Bingwa?</h2>
                        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Experience seamless digital bundle purchasing with our automated platform</p>
                    </div>
                    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
                            <div class="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <i class="fas fa-bolt text-primary text-2xl"></i>
                            </div>
                            <h3 class="mt-4 text-xl font-semibold text-gray-900">Instant Delivery</h3>
                            <p class="mt-2 text-gray-600">Receive your bundles within seconds of payment confirmation</p>
                        </div>
                        <div class="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
                            <div class="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <i class="fas fa-lock text-primary text-2xl"></i>
                            </div>
                            <h3 class="mt-4 text-xl font-semibold text-gray-900">Secure Payments</h3>
                            <p class="mt-2 text-gray-600">M-PESA STK Push with end-to-end encryption and security</p>
                        </div>
                        <div class="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
                            <div class="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <i class="fas fa-headset text-primary text-2xl"></i>
                            </div>
                            <h3 class="mt-4 text-xl font-semibold text-gray-900">24/7 Support</h3>
                            <p class="mt-2 text-gray-600">Round-the-clock customer support for all your queries</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Popular Bundles -->
            <div class="py-16 bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-gray-900">Popular Data Bundles</h2>
                        <p class="mt-4 text-lg text-gray-600">Choose from our most popular data packages</p>
                    </div>
                    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="bg-white rounded-xl shadow-md p-6 bundle-card card">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-primary">1GB</div>
                                <div class="text-lg text-gray-900">1hr</div>
                                <div class="mt-2 text-gray-600">KES 19</div>
                                <button onclick="initiateStkPush('1GB', '19')" class="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300 text-sm">Buy Now</button>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl shadow-md p-6 bundle-card card">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-primary"