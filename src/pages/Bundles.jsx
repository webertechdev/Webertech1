import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const dataBundles = [
  { size: "1GB", time: "1hr", price: 19 },
  { size: "1.5GB", time: "3hr", price: 49 },
  { size: "2GB", time: "24hr", price: 99 },
  { size: "6GB", time: "7days", price: 349 },
];

export default function Bundles() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const initiateStkPush = async (bundle, price) => {
    if (!phone || phone.length !== 10) {
      toast.error("Weka namba ya Safaricom: 07XXXXXXXX");
      return;
    }
    
    setLoading(true);
    toast.loading(`Sending KES ${price} STK to ${phone}...`);
    
    setTimeout(() => {
      setLoading(false);
      toast.success(`${bundle} Bundle sent! Check M-PESA`);
    }, 3000);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bingwa Sokoni Bundles</h1>
          <p className="text-gray-600">Instant Safaricom Data, Minutes & SMS. Okoa Jahazi inafanya.</p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <input 
            type="tel" 
            placeholder="07XX XXX XXX - Namba ya M-PESA" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 border rounded-lg text-center text-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6">Data Bundles</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {dataBundles.map((b) => (
            <div key={b.size} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
              <div className="text-3xl font-bold text-green-600">{b.size}</div>
              <div className="text-lg text-gray-900">{b.time}</div>
              <div className="mt-2 text-gray-600">KES {b.price}</div>
              <button 
                onClick={() => initiateStkPush(b.size, b.price)}
                disabled={loading}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}