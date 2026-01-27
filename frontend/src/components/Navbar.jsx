import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Applications', href: '/applications' },
    { name: 'Job Board', href: '/jobs' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Trackly</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-slate-600 hover:text-blue-600 px-1 pt-1 text-sm font-medium transition-colors"                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 transition"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              Sign up free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="pt-2 pb-3 space-y-1 px-4">            {navLinks.map((link) => (
              <Link
                key={link.name}                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-medium text-slate-600 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-6 border-t border-slate-100 px-4 space-y-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 text-base font-medium text-slate-600 border border-slate-200 rounded-lg"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 text-base font-medium bg-blue-600 text-white rounded-lg"
            >
              Sign up free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;