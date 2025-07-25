import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-blue-50 z-50 relative">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-blue-50 shadow-lg transform transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="px-6 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-lg font-medium transition-colors duration-200 relative group ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={closeMobileMenu}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out ${
                        location.pathname === item.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
