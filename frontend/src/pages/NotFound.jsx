import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <Search className="h-24 w-24 text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="btn-primary w-full flex items-center justify-center"
            >
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline w-full flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;