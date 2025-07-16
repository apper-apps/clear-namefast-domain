import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { domainService } from "@/services/api/domainService";

const SellerPortal = () => {
  const [sellerDomains, setSellerDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("submit");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    extension: ".com",
    description: "",
    ownershipConfirmed: false,
    termsAccepted: false
  });

  const [formErrors, setFormErrors] = useState({});

  const categories = [
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

  const loadSellerDomains = async () => {
    try {
      setLoading(true);
      setError("");
      // In a real app, this would filter by seller ID
      const domains = await domainService.getAll();
      setSellerDomains(domains.slice(0, 3)); // Mock seller's domains
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellerDomains();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) errors.name = "Domain name is required";
    if (!formData.price) errors.price = "Price is required";
    else if (isNaN(formData.price) || parseInt(formData.price) <= 0) errors.price = "Price must be a valid number";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.ownershipConfirmed) errors.ownershipConfirmed = "You must confirm ownership";
    if (!formData.termsAccepted) errors.termsAccepted = "You must accept the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      setSubmitting(true);
      
      const domainData = {
        name: formData.name.toLowerCase() + formData.extension,
        price: parseInt(formData.price),
        category: formData.category,
        extension: formData.extension,
        description: formData.description,
        status: "pending-approval",
        sellerId: "seller-123" // In real app, this would be current user ID
      };

      await domainService.create(domainData);
      
      toast.success("Domain submitted successfully! It will be reviewed by our team.");
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        extension: ".com",
        description: "",
        ownershipConfirmed: false,
        termsAccepted: false
      });
      
      // Reload seller domains
      loadSellerDomains();
      setActiveTab("listings");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-100";
      case "pending-approval": return "text-orange-600 bg-orange-100";
      case "rejected": return "text-red-600 bg-red-100";
      default: return "text-surface-600 bg-surface-100";
    }
  };

  const formatStatus = (status) => {
    return status.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-surface-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-surface-800 mb-2">
              Seller Portal
            </h1>
            <p className="text-xl text-surface-600">
              Submit your premium domains and track their approval status
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Globe" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-surface-800">{sellerDomains.length}</div>
                  <div className="text-sm text-surface-600">Total Listings</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="CheckCircle" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-surface-800">
                    {sellerDomains.filter(d => d.status === "approved").length}
                  </div>
                  <div className="text-sm text-surface-600">Approved</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Clock" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-surface-800">
                    {sellerDomains.filter(d => d.status === "pending-approval").length}
                  </div>
                  <div className="text-sm text-surface-600">Pending</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="DollarSign" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-surface-800">
                    ${sellerDomains.reduce((sum, d) => sum + (d.price || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-surface-600">Total Value</div>
                </div>
              </div>
            </motion.div>
          </div>

          {error && <Error message={error} onRetry={loadSellerDomains} />}

          {!error && (
            <>
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-card mb-8">
                <div className="border-b border-surface-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("submit")}
                      className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                        activeTab === "submit"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-surface-600 hover:text-surface-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Plus" size={20} />
                        Submit Domain
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("listings")}
                      className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                        activeTab === "listings"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-surface-600 hover:text-surface-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ApperIcon name="List" size={20} />
                        My Listings
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {activeTab === "submit" && (
                    <div className="max-w-2xl">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-surface-800 mb-2">
                          Submit Your Domain
                        </h2>
                        <p className="text-surface-600">
                          Fill out the form below to submit your domain for review. Our team will evaluate it within 24-48 hours.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Domain Name (without extension)</Label>
                            <input
                              type="text"
                              className="input-field"
                              placeholder="myawesomesite"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                            {formErrors.name && <p className="text-sm text-accent-500 mt-1">{formErrors.name}</p>}
                          </div>
                          
                          <div>
                            <Label>Extension</Label>
                            <Select
                              value={formData.extension}
                              onChange={(e) => handleInputChange("extension", e.target.value)}
                            >
                              {extensions.map(ext => (
                                <option key={ext} value={ext}>{ext}</option>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            label="Asking Price ($)"
                            type="number"
                            placeholder="1000"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            error={formErrors.price}
                          />
                          
                          <div>
                            <Label>Category</Label>
                            <Select
                              value={formData.category}
                              onChange={(e) => handleInputChange("category", e.target.value)}
                            >
                              <option value="">Select Category</option>
                              {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </Select>
                            {formErrors.category && <p className="text-sm text-accent-500 mt-1">{formErrors.category}</p>}
                          </div>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <textarea
                            className="input-field min-h-[100px]"
                            placeholder="Describe your domain, its potential uses, and why it's valuable..."
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                          />
                          {formErrors.description && <p className="text-sm text-accent-500 mt-1">{formErrors.description}</p>}
                        </div>

                        <div className="space-y-4">
                          <label className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={formData.ownershipConfirmed}
                              onChange={(e) => handleInputChange("ownershipConfirmed", e.target.checked)}
                              className="mt-1 text-primary-600"
                            />
                            <div className="text-sm text-surface-700">
                              I confirm that I am the rightful owner of this domain and have full authority to sell it.
                            </div>
                          </label>
                          {formErrors.ownershipConfirmed && (
                            <p className="text-sm text-accent-500">{formErrors.ownershipConfirmed}</p>
                          )}

                          <label className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={formData.termsAccepted}
                              onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                              className="mt-1 text-primary-600"
                            />
                            <div className="text-sm text-surface-700">
                              I agree to the{" "}
                              <a href="#" className="text-primary-600 hover:underline">Seller Terms</a>{" "}
                              and understand that NameFast will review and curate my listing.
                            </div>
                          </label>
                          {formErrors.termsAccepted && (
                            <p className="text-sm text-accent-500">{formErrors.termsAccepted}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={submitting}
                          className="w-full"
                        >
                          {submitting ? (
                            <>
                              <ApperIcon name="Loader2" size={20} className="animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <ApperIcon name="Send" size={20} />
                              Submit Domain for Review
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  )}

                  {activeTab === "listings" && (
                    <div>
                      {sellerDomains.length === 0 ? (
                        <Empty 
                          title="No domains submitted yet"
                          description="Start by submitting your first domain for review. Our team will evaluate it within 24-48 hours."
                          actionText="Submit Domain"
                          actionPath="#"
                          icon="Plus"
                        />
                      ) : (
                        <div className="space-y-4">
                          {sellerDomains.map((domain, index) => (
                            <motion.div
                              key={domain.Id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border border-surface-200 rounded-lg p-6 hover:border-primary-300 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-surface-800">
                                    {domain.name}
                                  </h3>
                                  <p className="text-surface-600">{domain.category}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(domain.status)}`}>
                                    {formatStatus(domain.status)}
                                  </span>
                                  <span className="text-lg font-bold text-surface-800">
                                    ${domain.price.toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              <p className="text-surface-600 mb-4">{domain.description}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6 text-sm text-surface-600">
                                  <div className="flex items-center gap-1">
                                    <ApperIcon name="Calendar" size={14} />
                                    <span>Submitted {new Date(domain.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ApperIcon name="Tag" size={14} />
                                    <span>{domain.extension}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="Edit" size={16} />
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="Eye" size={16} />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SellerPortal;