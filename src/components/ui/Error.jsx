import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-surface-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-surface-600 mb-6">
          {message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            <ApperIcon name="RefreshCw" size={20} />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;