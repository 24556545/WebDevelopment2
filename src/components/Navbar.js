import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              FundraiserApp
            </Link>
          </div>

          {/* Toggle button (for mobile view) */}
          <div className="block md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Main Menu (for desktop view) */}
          <div className="hidden md:flex md:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-indigo-600">
              Home
            </Link>
            <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-indigo-600">
              Register
            </Link>
            <Link to="/fundraisers" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-indigo-600">
              Fundraisers
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 md:hidden">
          <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-indigo-600">
            Home
          </Link>
          <Link to="/fundraisers" className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-indigo-600">
            Fundraisers
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
