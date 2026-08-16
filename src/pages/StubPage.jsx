import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StubPage({ title }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">This page is currently under development. Please check back soon!</p>
          <a href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
