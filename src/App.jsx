// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cyber from "./pages/Cyber";
import Hustle from "./pages/Hustle";
import Academy from "./pages/Academy";
import Electronics from "./pages/Electronics";
import Bundles from "./pages/Bundles";
import Dev from "./pages/Dev";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cyber" element={<Cyber />} />
        <Route path="/hustle" element={<Hustle />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/bundles"
element={<Bundles />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}