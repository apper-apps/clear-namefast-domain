import React from "react";
import { motion } from "framer-motion";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    "All Categories",
    "Technology",
    "Business", 
    "Health",
    "Finance",
    "Education",
    "Entertainment",
    "Food",
    "Travel",
    "Fashion",
    "Real Estate"
  ];

  const extensions = [
    "All Extensions",
    ".com",
    ".io",
    ".net",
    ".org",
    ".co",
    ".app",
    ".dev",
    ".tech",
    ".ai"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-6 shadow-card sticky top-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-surface-800">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <ApperIcon name="X" size={16} />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Category</Label>
          <Select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category === "All Categories" ? "" : category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Extension</Label>
          <Select
            value={filters.extension}
            onChange={(e) => onFilterChange("extension", e.target.value)}
          >
            {extensions.map(ext => (
              <option key={ext} value={ext === "All Extensions" ? "" : ext}>
                {ext}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Domain Length</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minLength}
              onChange={(e) => onFilterChange("minLength", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxLength}
              onChange={(e) => onFilterChange("maxLength", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Sort By</Label>
          <Select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;