import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate('/signin');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setProfileDropdown(false);
    setMenuOpen(false);
    navigate('/');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-700 tracking-tight">
              QuantumSite
            </h1>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-10 text-gray-700 font-semibold">
              <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-md hover:bg-green-50">
                Home
              </li>
              <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-md hover:bg-green-50">
                About
              </li>
              <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-md hover:bg-green-50">
                Services
              </li>
              <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-md hover:bg-green-50">
                Contact
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:block">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="profile-button flex items-center space-x-2 text-green-700 hover:text-green-600 transition-colors duration-200 focus:outline-none p-2 rounded-full hover:bg-green-50"
                    onClick={toggleProfileDropdown}
                  >
                    <FaUserCircle className="text-3xl sm:text-4xl" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdown && (
                    <div className="profile-dropdown absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="py-2">
                        <div className="px-4 py-3 text-gray-700 border-b border-gray-100">
                          <p className="font-semibold text-sm sm:text-base">Welcome, {user?.name}!</p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <button
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="flex items-center px-3 sm:px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none text-sm sm:text-base"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </div>

            <button
              className="md:hidden p-2 text-2xl sm:text-3xl text-green-700 focus:outline-none rounded-md hover:bg-green-50 transition-colors duration-200"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 sm:px-6 py-4 space-y-2">
            <div className="space-y-1">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 text-gray-700 font-semibold hover:text-green-600 hover:bg-green-50 transition-colors duration-200 rounded-md"
                  onClick={handleMenuToggle}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-gray-700 border border-gray-200 rounded-md bg-gray-50">
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    <FaUserCircle className="text-2xl sm:text-3xl mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200"
                  onClick={handleLogin}
                >
                  <FaUserCircle className="text-2xl sm:text-3xl mr-3" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
