import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { authContext } from "../../Context/AuthContext";
import { FiHome, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userLogin, setUserLogin } = useContext(authContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black text-blue-600">
              logo
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {userLogin ? (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <FiHome size={18} />
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <FiUser size={18} />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-white px-4 py-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors font-medium focus:outline-none"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-colors font-medium rounded-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              {!isOpen ? <FaBars /> : <IoMdClose />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="p-3 pb-4 space-y-1 bg-white border-t border-gray-100">
          <div className="flex flex-col gap-3">
            {userLogin ? (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1.5"
                >
                  <FiHome size={18} />
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1.5"
                >
                  <FiUser size={18} />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer transition-colors font-medium focus:outline-none"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1.5"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-colors font-medium rounded-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
