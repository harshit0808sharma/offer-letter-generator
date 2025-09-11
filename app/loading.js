'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaSpa } from 'react-icons/fa';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Logo/Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="text-indigo-600 text-6xl mb-8"
      >
        <FaSpa />
      </motion.div>

      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-t-indigo-600 border-b-indigo-600 border-l-indigo-200 border-r-indigo-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-xl text-indigo-900 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Preparing your offer letter...
      </motion.p>
    </div>
  );
};

export default LoadingPage;
