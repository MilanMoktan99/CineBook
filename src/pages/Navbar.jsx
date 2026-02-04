import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Film, User } from "lucide-react";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Read profile image and role from cookies
  const profileImage = Cookies.get("profileURL");
  const role = Cookies.get("role"); // 'admin' or 'user'

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    Cookies.remove("uid");
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("profileURL");
    Cookies.remove("role");
    logout();
    navigate("/login");
    setOpen(false)
  };

  return (
    <nav className="bg-black/90 backdrop-blur border-b border-gray-800 sticky top-0  z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
            <Film />
            <Link to="/">CineBook</Link>
          </div>

          <div className="hidden md:flex gap-6 text-gray-300">
            <Link to="/movies" className="hover:text-white">Movies</Link>
            <Link to="/category" className="hover:text-white">Category</Link>
            <Link to="/genre" className="hover:text-white">Genre</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              placeholder="Search movies..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* AUTH SECTION */}
          {!user ? (
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-medium"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-700 flex items-center justify-center bg-gray-800"
              >
                {profileImage ? (
                  <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-gray-300 cursor-pointer" />
                )}
              </button>

              {/* DROPDOWN */}
              {dropdown && (
                <div className="absolute right-0 mt-3 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                  {role === "admin" && (
                    <button
                      onClick={() => {
                        setDropdown(false);
                        navigate("/dashboard");
                      }}
                      className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-800 text-gray-400 cursor-pointer"
                    >
                      🛠 Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setDropdown(false);
                      navigate("/my-booking");
                    }}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-800 text-gray-400 cursor-pointer"
                  >
                    🎟 My Bookings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 cursor-pointer"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute right-0 left-0 px-6 pb-6 space-y-4 bg-black/90 text-gray-300">
          <Link onClick={() => setOpen(!open)} to="/" className="block">Home</Link>
          <Link onClick={() => setOpen(!open)} to="/movies" className="block">Movies</Link>
          <Link onClick={() => setOpen(!open)} to="/category" className="block">Category</Link>
          <Link onClick={() => setOpen(!open)} to="/genre" className="block">Genre</Link>
          <Link onClick={() => setOpen(!open)} to="/contact" className="block">Contact</Link>

          <hr />
          {!user ? (
            <Link to="/register" className="block text-center bg-red-600 py-2 rounded-full">
              Sign In
            </Link>
          ) : (
            <>
              {role === "admin" && (
                <Link to="/dashboard" onClick={() => setOpen(!open)} className="block">Dashboard</Link>
              )}
              <Link to="/my-bookings" onClick={() => setOpen(!open)} className="block">My Bookings</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
