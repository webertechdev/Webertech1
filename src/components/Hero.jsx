// src/components/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-32 pb-20 text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          WeberTech Solutions KE
        </h1>
        <p className="text-lg md:text-2xl mb-8 opacity-90">
          Your One-Stop Hub for Digital Services — Start. Grow. Earn. Repeat.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/hustle" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
            Explore Hustle KE
          </Link>
          <Link to="/electronics" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
            Shop Electronics
          </Link>
          <Link to="/bundles" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
            Buy Bundles
          </Link>
          <Link to="/academy" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
            Join Academy
          </Link>
        </div>
      </div>
    </section>
  );
}