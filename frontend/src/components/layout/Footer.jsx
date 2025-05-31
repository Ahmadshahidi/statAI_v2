import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart2 size={24} className="text-secondary-400" />
              <span className="font-bold text-xl">StatisticsMaster</span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering students and professionals with expert-led statistics courses.
              Master statistical concepts with interactive lessons and real-world applications.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Course Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=basics" className="text-gray-300 hover:text-white transition-colors">
                  Statistics Basics
                </Link>
              </li>
              <li>
                <Link to="/courses?category=research" className="text-gray-300 hover:text-white transition-colors">
                  Research Methods
                </Link>
              </li>
              <li>
                <Link to="/courses?category=data-analysis" className="text-gray-300 hover:text-white transition-colors">
                  Data Analysis
                </Link>
              </li>
              <li>
                <Link to="/courses?category=probability" className="text-gray-300 hover:text-white transition-colors">
                  Probability Theory
                </Link>
              </li>
              <li>
                <Link to="/courses?category=machine-learning" className="text-gray-300 hover:text-white transition-colors">
                  Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Statistics Avenue, Data City, CA 94107
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary-400 flex-shrink-0" />
                <span className="text-gray-300">info@statisticsmaster.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} StatisticsMaster. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white mx-2 md:ml-0 md:mr-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white mx-2 md:mx-4">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 text-sm hover:text-white mx-2 md:mx-4">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;