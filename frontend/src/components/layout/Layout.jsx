import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

function Layout() {
  const { darkMode } = useTheme();

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-gray-500 dark:bg-gray-100 ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      
      <motion.main 
        className="flex-grow pt-16 transition-colors duration-200 bg-gray-500 dark:bg-gray-900"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Outlet />
      </motion.main>
      
      <Footer />
    </div>
  );
}

export default Layout;