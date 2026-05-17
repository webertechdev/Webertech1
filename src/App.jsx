// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Cyber from "./pages/Cyber";
import Hustle from "./pages/Hustle";
import Academy from "./pages/Academy";
import Electronics from "./pages/Electronics";
import Dev from "./pages/Dev";
import NotFound from "./pages/NotFound";

// This component redirects to your Firebase app immediately
function BundlesRedirect() {
  useEffect(() => {
    window.location.replace("https://bundles.webertech.co.ke");
  }, []);
  return null;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cyber" element={<Cyber />} />
        <Route path="/hustle" element={<Hustle />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/bundles" element={<BundlesRedirect />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}