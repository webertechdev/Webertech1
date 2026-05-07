import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div style={{padding: '20px', textAlign: 'center', fontFamily: 'sans-serif'}}>
      <h1 style={{color: '#0066cc'}}>WeberTech Bingwa Bundles</h1>
      <p>Nunua bundles za Safaricom haraka na rahisi</p>
      
      <div style={{margin: '30px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
        <h2>1GB @ Ksh 19</h2>
        <p>Inaisha 1 Hour</p>
        <button style={{padding: '12px 30px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px'}}>
          Lipa na M-Pesa
        </button>
      </div>
      
      <div style={{margin: '30px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
        <h2>350MB @ Ksh 49</h2>
        <p>Inaisha 7 Days</p>
        <button style={{padding: '12px 30px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px'}}>
          Lipa na M-Pesa
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}