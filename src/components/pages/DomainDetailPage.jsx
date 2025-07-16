import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { domainService } from "@/services/api/domainService";

const DomainDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDomain = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await domainService.getById(parseInt(id));
      setDomain(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomain();
  }, [id]);

  const handlePurchase = () => {
    navigate(`/purchase/${id}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

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

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDomain} />;
  if (!domain) return <Error message="Domain not found" />;

  return (
    <div className="min-h-screen bg-surface-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-surface-600 mb-6">
            <button onClick={() => navigate("/")} className="hover:text-primary-600">
              Home
            </button>
            <ApperIcon name="ChevronRight" size={16} />
            <button onClick={() => navigate("/browse")} className="hover:text-primary-600">
              Browse
            </button>
            <ApperIcon name="ChevronRight" size={16} />
            <span>{domain.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Domain Header */}
              <div className="bg-white rounded-xl p-8 shadow-card">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <ApperIcon name={getCategoryIcon(domain.category)} size={24} className="text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-surface-800 mb-2">
                        {domain.name}
                      </h1>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-surface-600 bg-surface-100 px-3 py-1 rounded-full">
                          {domain.category}
                        </span>
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {domain.extension}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={handleShare}>
                    <ApperIcon name="Share2" size={20} />
                  </Button>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-lg text-surface-700 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* Domain Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-surface-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-surface-800 mb-1">
                      {domain.name.length}
                    </div>
                    <div className="text-sm text-surface-600">Characters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-surface-800 mb-1">
                      {new Date(domain.createdAt).getFullYear()}
                    </div>
                    <div className="text-sm text-surface-600">Listed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      <ApperIcon name="CheckCircle" size={24} className="mx-auto" />
                    </div>
                    <div className="text-sm text-surface-600">Verified</div>
                  </div>
                </div>
              </div>

              {/* Features & Benefits */}
              <div className="bg-white rounded-xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-surface-800 mb-6">
                  Why This Domain?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="CheckCircle" size={16} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-800 mb-1">Premium Extension</h3>
                      <p className="text-sm text-surface-600">Highly trusted {domain.extension} domain extension</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Zap" size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-800 mb-1">Brandable Name</h3>
                      <p className="text-sm text-surface-600">Easy to remember and perfect for branding</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="TrendingUp" size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-800 mb-1">Market Ready</h3>
                      <p className="text-sm text-surface-600">Perfect for {domain.category.toLowerCase()} businesses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Shield" size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-800 mb-1">Secure Transfer</h3>
                      <p className="text-sm text-surface-600">Protected by escrow until transfer complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-xl p-6 shadow-card sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    ${domain.price.toLocaleString()}
                  </div>
                  <p className="text-surface-600">One-time purchase</p>
                </div>

                <Button 
                  onClick={handlePurchase}
                  variant="primary" 
                  size="lg" 
                  className="w-full mb-4"
                >
                  <ApperIcon name="ShoppingCart" size={20} />
                  Purchase Domain
                </Button>

                <div className="space-y-3 text-sm text-surface-600">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Shield" size={16} className="text-green-500" />
                    <span>Secure escrow protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Clock" size={16} className="text-blue-500" />
                    <span>24-48 hour transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="RefreshCw" size={16} className="text-orange-500" />
                    <span>30-day money back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Headphones" size={16} className="text-purple-500" />
                    <span>Expert transfer support</span>
                  </div>
                </div>
              </div>

              {/* FounderPass Perks */}
              <div className="bg-gradient-primary rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="https://cdn.prod.website-files.com/604637da1d40366d4e19de8e/6304f48a0cc2726f9f3df4f5_Pass%20(10)-p-500.png" 
                    alt="FounderPass" 
                    className="h-6 w-auto"
                  />
                  <span className="font-semibold">Bonus Perks</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Get $2,000+ in Startup Tools</h3>
                <ul className="space-y-2 text-sm text-white/90 mb-4">
                  <li className="flex items-center gap-2">
                    <ApperIcon name="Check" size={14} />
                    <span>Web hosting credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ApperIcon name="Check" size={14} />
                    <span>Logo design tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ApperIcon name="Check" size={14} />
                    <span>Marketing software</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ApperIcon name="Check" size={14} />
                    <span>Business templates</span>
                  </li>
                </ul>
                <Button variant="secondary" size="sm" className="w-full">
                  <ApperIcon name="Gift" size={16} />
                  View All Perks
                </Button>
              </div>

              {/* Contact Support */}
              <div className="bg-white rounded-xl p-6 shadow-card">
                <h3 className="font-semibold text-surface-800 mb-3">Need Help?</h3>
                <p className="text-sm text-surface-600 mb-4">
                  Our domain experts are here to help with your purchase and transfer.
                </p>
                <Button variant="ghost" className="w-full">
                  <ApperIcon name="MessageCircle" size={16} />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DomainDetailPage;