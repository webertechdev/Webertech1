// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="/logo-webertech.png" alt="WeberTech Logo" className="h-8" />
            <span className="font-bold text-xl">WeberTech</span>
          </div>
          <p className="text-gray-400">Your One-Stop Hub for Digital Services</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/hustle" className="block text-gray-400 hover:text-white">Hustle KE</Link>
            <Link to="/bundles" className="block text-gray-400 hover:text-white">Bingwa Bundles</Link>
            <Link to="/academy" className="block text-gray-400 hover:text-white">Academy</Link>
            <Link to="/electronics" className="block text-gray-400 hover:text-white">Electronics</Link>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold mb-4">Services</h3>
          <div className="space-y-2">
            <Link to="/cyber" className="block text-gray-400 hover:text-white">Cyber Services</Link>
            <Link to="/dev" className="block text-gray-400 hover:text-white">Software Dev</Link>
            <p className="text-gray-400">M-Pesa Loans</p>
            <p className="text-gray-400">SaaS Systems</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4">Contact Us</h3>
          <a href="https://wa.me/254722508904" className="block text-gray-400 hover:text-white mb-2">
            WhatsApp: 0722 508 904
          </a>
          <p className="text-gray-400 mb-4">Nairobi, Kenya</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">TikTok</a>
            <a href="#" className="text-gray-400 hover:text-white">YouTube</a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2026 WeberTech Solutions KE. All rights reserved.</p>
      </div>
    </footer>
  );
}