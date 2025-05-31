import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, ChevronDown, BarChart2, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import UserMenu from './UserMenu';
import { useTheme } from '../../contexts/ThemeContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? 'bg-white dark:bg-gray-800 shadow-md py-2'
      : 'bg-transparent dark:bg-transparent py-4'
  }`;

  const linkClasses = `font-medium transition-colors duration-200 hover:text-secondary-500 ${
    scrolled ? 'text-primary-900' : 'text-primary-900'
  } dark:text-gray-100`;

  const activeLinkClasses = `${linkClasses} text-secondary-500 font-semibold`;

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BarChart2 size={28} className="text-primary-600" />
            <span className="font-bold text-xl text-primary-900">
              StatisticsMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/"
              className={isActiveLink('/') ? activeLinkClasses : linkClasses}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={isActiveLink('/courses') ? activeLinkClasses : linkClasses}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className={isActiveLink('/about') ? activeLinkClasses : linkClasses}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={isActiveLink('/contact') ? activeLinkClasses : linkClasses}
            >
              Contact
            </Link>

            {/* Auth Buttons or User Menu */}
            {!loading && (
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="btn-outline py-1.5 px-4 text-sm"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary py-1.5 px-4 text-sm"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={isActiveLink('/') ? activeLinkClasses : linkClasses}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={isActiveLink('/courses') ? activeLinkClasses : linkClasses}
              >
                Courses
              </Link>
              <Link
                to="/about"
                className={isActiveLink('/about') ? activeLinkClasses : linkClasses}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={isActiveLink('/contact') ? activeLinkClasses : linkClasses}
              >
                Contact
              </Link>

              {/* Auth Buttons */}
              {!loading && (
                <div className="pt-2 border-t border-gray-200">
                  {user ? (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to="/dashboard"
                        className="btn-secondary w-full"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="btn-outline w-full"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => useAuth().signOut()}
                        className="btn-outline w-full"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to="/login"
                        className="btn-outline w-full"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        className="btn-primary w-full"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;