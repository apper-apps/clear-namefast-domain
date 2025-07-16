import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full space-y-6">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-surface rounded-xl p-8">
        <div className="text-center space-y-4">
          <motion.div
            className="h-12 bg-surface-300 rounded-lg mx-auto w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-6 bg-surface-300 rounded-lg mx-auto w-1/2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-12 bg-surface-300 rounded-lg mx-auto w-2/3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>

      {/* Domain Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-card"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-surface-300 rounded-lg" />
                <div className="h-6 bg-surface-300 rounded-md w-20" />
              </div>
              <div className="h-6 bg-surface-300 rounded-full w-16" />
            </div>
            <div className="h-6 bg-surface-300 rounded-lg mb-2 w-3/4" />
            <div className="h-4 bg-surface-300 rounded-lg mb-4 w-full" />
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="h-4 bg-surface-300 rounded w-16" />
                <div className="h-4 bg-surface-300 rounded w-12" />
              </div>
              <div className="h-8 bg-surface-300 rounded-lg w-24" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;