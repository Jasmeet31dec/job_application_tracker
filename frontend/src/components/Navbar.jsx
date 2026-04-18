import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track the current URL path
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  let decoded = null;

  let navLinks = [];
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token session:", err);
      // Optionally: localStorage.removeItem("token");
    }

    {decoded?.role === 'admin'? navLinks = [
      { name: 'Dashboard', href: '/dashboard' }
    ]:navLinks = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Applications', href: '/applications' },
      { name: 'Job Board', href: '/jobs' },
    ]
  }
    
  } else {
    navLinks = [
      { name: 'Features', href: '/features' },
      { name: 'Why Trackly', href: '/whyTrackly' },
    ];
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-indigo-600 tracking-tighter uppercase">
                Trackly<span className="text-slate-900">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-1 pt-1 text-sm font-semibold transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full ${isActive
                        ? 'text-indigo-600 after:w-full'
                        : 'text-slate-600 hover:text-indigo-600 after:w-0'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-5">
            {token ? (
              <Link
                onClick={handleLogout}
                to='/'
                className="text-slate-600 hover:text-indigo-600 font-bold text-sm transition"
              >
                Log out
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-indigo-600 font-bold text-sm transition"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition shadow-lg shadow-indigo-100 active:scale-95"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-100 focus:outline-none transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="pt-4 pb-3 space-y-1 px-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 text-base font-bold rounded-xl transition ${isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 pb-8 border-t border-slate-100 px-6 space-y-4">
            {token ? (
              <Link
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                to="/login"
                className="block w-full text-center py-3 text-base font-bold text-slate-600 bg-slate-50 rounded-full"
              >
                Log out
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 text-base font-bold text-slate-700 border border-slate-200 rounded-full"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 text-base font-bold bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-100"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;