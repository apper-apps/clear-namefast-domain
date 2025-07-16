import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ placeholder = "Search domains...", size = "md", onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/browse?search=${encodeURIComponent(query)}`);
      }
    }
  };

  const inputSize = size === "lg" ? "text-lg py-4 px-6" : "py-3 px-4";

  return (
    <form onSubmit={handleSearch} className="relative flex">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`pr-12 ${inputSize} flex-1`}
      />
      <Button
        type="submit"
        variant="primary"
        size={size}
        className="absolute right-1 top-1 h-[calc(100%-8px)]"
      >
        <ApperIcon name="Search" size={20} />
      </Button>
    </form>
  );
};

export default SearchBar;