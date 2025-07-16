import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import DomainCard from "@/components/molecules/DomainCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { domainService } from "@/services/api/domainService";

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const domainsPerPage = 9;

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: "",
    extension: "",
    minPrice: "",
    maxPrice: "",
    minLength: "",
    maxLength: "",
    sortBy: "newest"
  });

  const loadDomains = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await domainService.getAll();
      setDomains(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomains();
  }, []);

  useEffect(() => {
    let filtered = [...domains];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(domain =>
        domain.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        domain.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(domain => domain.category === filters.category);
    }

    if (filters.extension) {
      filtered = filtered.filter(domain => domain.extension === filters.extension);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(domain => domain.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(domain => domain.price <= parseInt(filters.maxPrice));
    }

    if (filters.minLength) {
      filtered = filtered.filter(domain => domain.name.length >= parseInt(filters.minLength));
    }

    if (filters.maxLength) {
      filtered = filtered.filter(domain => domain.name.length <= parseInt(filters.maxLength));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredDomains(filtered);
    setCurrentPage(1);
  }, [domains, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, search: query }));
    setSearchParams({ search: query });
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "",
      extension: "",
      minPrice: "",
      maxPrice: "",
      minLength: "",
      maxLength: "",
      sortBy: "newest"
    });
    setSearchParams({});
  };

  // Pagination
  const totalPages = Math.ceil(filteredDomains.length / domainsPerPage);
  const startIndex = (currentPage - 1) * domainsPerPage;
  const paginatedDomains = filteredDomains.slice(startIndex, startIndex + domainsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-surface-800 mb-4">
            Browse Premium Domains
          </h1>
          <p className="text-xl text-surface-600 mb-6">
            Discover {domains.length} carefully curated domains for your business
          </p>
          
          <div className="max-w-2xl">
            <SearchBar 
              placeholder="Search domains by name or keyword..."
              onSearch={handleSearch}
            />
          </div>
        </motion.div>

        {error && <Error message={error} onRetry={loadDomains} />}

        {!error && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-surface-600">
                  Showing {startIndex + 1}-{Math.min(startIndex + domainsPerPage, filteredDomains.length)} of {filteredDomains.length} domains
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-surface-600">Sort:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="text-sm border border-surface-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

              {/* Domain Grid */}
              {filteredDomains.length === 0 ? (
                <Empty 
                  title="No domains match your criteria"
                  description="Try adjusting your filters or search terms to find more domains."
                  actionText="Clear Filters"
                  actionPath="#"
                  icon="Filter"
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedDomains.map((domain, index) => (
                      <motion.div
                        key={domain.Id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <DomainCard domain={domain} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ApperIcon name="ChevronLeft" size={20} />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "primary" : "ghost"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className="w-10 h-10"
                              >
                                {page}
                              </Button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-2">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <Button
                        variant="ghost"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ApperIcon name="ChevronRight" size={20} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;