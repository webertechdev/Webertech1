// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - PATH IMEFIXIWA */}
        <div className="flex items-center space-x-2">
          <img src="/logo-webertech.png" alt="WeberTech Logo" className="h-10" />
          <span className="font-bold text-xl text-blue-600">WeberTech</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/cyber" className="hover:text-blue-600">Cyber</Link>
          <Link to="/hustle" className="hover:text-blue-600">Hustle KE</Link>
          <Link to="/academy" className="hover:text-blue-600">Academy</Link>
          <Link to="/electronics" className="hover:text-blue-600">Electronics</Link>
          <a href="https://bundles.webertech.co.ke" className="hover:text-blue-600" rel="noopener noreferrer">Bundles</a>
          <Link to="/dev" className="hover:text-blue-600">Dev</Link>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/254722508904"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          WhatsApp Us
        </a>
      </div>
    </nav>
  );
}