import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 text-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page haipo mkuu</p>
      <Link to="/" className="mt-8 inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
        Rudi Homepage
      </Link>
    </div>
  );
}