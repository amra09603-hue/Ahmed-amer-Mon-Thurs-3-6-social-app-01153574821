import { MdErrorOutline } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
            <MdErrorOutline className="text-blue-600" size={64} />
          </div>
        </div>

        <h1 className="text-6xl font-black text-blue-600 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          No data found. The page you are looking for doesn’t exist or has been
          moved.
        </p>

        <Link
          to={"/"}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
        >
          <FiHome size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
