import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DomainCard = ({ domain }) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    const icons = {
      "Technology": "Laptop",
      "Business": "Briefcase",
      "Health": "Heart",
      "Finance": "DollarSign",
      "Education": "GraduationCap",
      "Entertainment": "Play",
      "Food": "UtensilsCrossed",
      "Travel": "Plane",
      "Fashion": "Shirt",
      "Real Estate": "Home"
    };
    return icons[category] || "Globe";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="card cursor-pointer"
      onClick={() => navigate(`/domain/${domain.Id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <ApperIcon name={getCategoryIcon(domain.category)} size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-surface-600 bg-surface-100 px-2 py-1 rounded-md">
            {domain.category}
          </span>
        </div>
        <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${domain.price.toLocaleString()}
        </div>
      </div>

      <h3 className="text-xl font-bold text-surface-800 mb-2 hover:text-primary-600 transition-colors">
        {domain.name}
      </h3>

      <p className="text-surface-600 text-sm mb-4 line-clamp-2">
        {domain.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-surface-500">
          <div className="flex items-center gap-1">
            <ApperIcon name="Clock" size={14} />
            <span>{new Date(domain.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="TrendingUp" size={14} />
            <span>{domain.extension}</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
          View Details
          <ApperIcon name="ArrowRight" size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default DomainCard;