import React from 'react';
import { BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <BarChart2 size={48} className="text-primary-600 mb-4" />
        
        <motion.div 
          className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mb-4"
        >
          <motion.div
            className="h-full bg-secondary-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-primary-800 font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;