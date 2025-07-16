import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No domains found", 
  description = "We couldn't find any domains matching your criteria. Try adjusting your filters or search terms.",
  actionText = "Browse All Domains",
  actionPath = "/browse",
  icon = "Search"
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-surface-800 mb-2">
          {title}
        </h3>
        <p className="text-surface-600 mb-6">
          {description}
        </p>
        <div className="space-y-3">
          <Button onClick={() => navigate(actionPath)} variant="primary">
            <ApperIcon name="ArrowRight" size={20} />
            {actionText}
          </Button>
          <Button onClick={() => navigate("/ai-assistant")} variant="secondary">
            <ApperIcon name="Sparkles" size={20} />
            Try AI Assistant
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;