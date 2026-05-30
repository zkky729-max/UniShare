import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      
      <Link to="/" className="font-bold text-xl">
        UniShare 🚀
      </Link>

      <div className="flex items-center gap-4">

        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>

            <span className="text-sm text-gray-600">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500">
              Login
            </Link>

            <Link to="/register" className="hover:text-blue-500">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}