import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { purchaseService } from "@/services/api/purchaseService";
import { founderPassService } from "@/services/api/founderPassService";

const BuyerDashboard = () => {
  const [searchParams] = useSearchParams();
  const [purchases, setPurchases] = useState([]);
  const [perks, setPerks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("purchases");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [purchaseData, perksData] = await Promise.all([
        purchaseService.getAll(),
        founderPassService.getAll()
      ]);
      setPurchases(purchaseData);
      setPerks(perksData);

      // Show success message if redirected from purchase
      const purchaseId = searchParams.get("purchase");
      if (purchaseId) {
        toast.success("Purchase successful! Your domain transfer is being processed.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "processing": return "text-blue-600 bg-blue-100";
      case "pending": return "text-orange-600 bg-orange-100";
      default: return "text-surface-600 bg-surface-100";
    }
  };

  const getTransferStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "in-progress": return "text-blue-600 bg-blue-100";
      case "awaiting-action": return "text-orange-600 bg-orange-100";
      case "initiated": return "text-purple-600 bg-purple-100";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-surface-800 mb-2">
              Buyer Dashboard
            </h1>
            <p className="text-xl text-surface-600">
              Manage your domain purchases and access exclusive perks
            </p>
          </div>

          {error && <Error message={error} onRetry={loadData} />}

          {!error && (
            <>
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
                      <ApperIcon name="ShoppingBag" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-surface-800">{purchases.length}</div>
                      <div className="text-sm text-surface-600">Total Purchases</div>
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
                        {purchases.filter(p => p.transferStatus === "completed").length}
                      </div>
                      <div className="text-sm text-surface-600">Completed Transfers</div>
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
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Clock" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-surface-800">
                        {purchases.filter(p => p.transferStatus === "in-progress").length}
                      </div>
                      <div className="text-sm text-surface-600">In Progress</div>
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
                      <ApperIcon name="Gift" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-surface-800">{perks.length}</div>
                      <div className="text-sm text-surface-600">Available Perks</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-card mb-8">
                <div className="border-b border-surface-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("purchases")}
                      className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                        activeTab === "purchases"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-surface-600 hover:text-surface-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ApperIcon name="ShoppingBag" size={20} />
                        My Purchases
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("perks")}
                      className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                        activeTab === "perks"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-surface-600 hover:text-surface-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Gift" size={20} />
                        FounderPass Perks
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "purchases" && (
                    <div>
                      {purchases.length === 0 ? (
                        <Empty 
                          title="No purchases yet"
                          description="Start your domain journey by browsing our curated collection of premium domains."
                          actionText="Browse Domains"
                          actionPath="/browse"
                          icon="ShoppingBag"
                        />
                      ) : (
                        <div className="space-y-4">
                          {purchases.map((purchase, index) => (
                            <motion.div
                              key={purchase.Id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border border-surface-200 rounded-lg p-6 hover:border-primary-300 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-surface-800">
                                    Domain Purchase #{purchase.Id}
                                  </h3>
                                  <p className="text-surface-600">
                                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(purchase.status)}`}>
                                    {formatStatus(purchase.status)}
                                  </span>
                                  <span className="text-lg font-bold text-surface-800">
                                    ${purchase.amount.toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              {/* Transfer Status */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-surface-700">Transfer Status</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransferStatusColor(purchase.transferStatus)}`}>
                                    {formatStatus(purchase.transferStatus)}
                                  </span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="w-full bg-surface-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                      width: purchase.transferStatus === "completed" ? "100%" :
                                             purchase.transferStatus === "in-progress" ? "75%" :
                                             purchase.transferStatus === "awaiting-action" ? "50%" :
                                             purchase.transferStatus === "initiated" ? "25%" : "0%"
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6 text-sm text-surface-600">
                                  <div className="flex items-center gap-1">
                                    <ApperIcon name="Calendar" size={14} />
                                    <span>Purchased {new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ApperIcon name="CreditCard" size={14} />
                                    <span>Payment ID: {purchase.Id}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="Download" size={16} />
                                    Invoice
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="MessageCircle" size={16} />
                                    Support
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "perks" && (
                    <div>
                      {/* FounderPass Header */}
                      <div className="bg-gradient-primary rounded-xl p-6 text-white mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src="https://cdn.prod.website-files.com/604637da1d40366d4e19de8e/6304f48a0cc2726f9f3df4f5_Pass%20(10)-p-500.png" 
                            alt="FounderPass" 
                            className="h-8 w-auto"
                          />
                          <span className="text-xl font-bold">FounderPass Perks</span>
                        </div>
                        <p className="text-white/90 mb-4">
                          Access $2,000+ worth of startup tools and resources to accelerate your business growth.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <ApperIcon name="Check" size={16} />
                            <span>Lifetime access included</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ApperIcon name="Zap" size={16} />
                            <span>Instant activation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ApperIcon name="Star" size={16} />
                            <span>Premium benefits</span>
                          </div>
                        </div>
                      </div>

                      {/* Perks Grid */}
                      {perks.length === 0 ? (
                        <Empty 
                          title="Perks coming soon"
                          description="FounderPass perks are being updated. Check back soon for exclusive startup tools and discounts."
                          actionText="Contact Support"
                          actionPath="#"
                          icon="Gift"
                        />
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {perks.map((perk, index) => (
                            <motion.div
                              key={perk.Id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border border-surface-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-card-hover transition-all"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-surface-800">{perk.title}</h3>
                                <span className="text-xs bg-surface-100 text-surface-600 px-2 py-1 rounded">
                                  {perk.category}
                                </span>
                              </div>
                              <p className="text-surface-600 text-sm mb-4">{perk.description}</p>
                              
                              <div className="flex items-center justify-between">
                                {perk.couponCode && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-surface-500">Code:</span>
                                    <code className="bg-surface-100 px-2 py-1 rounded text-sm font-mono">
                                      {perk.couponCode}
                                    </code>
                                  </div>
                                )}
                                <Button variant="primary" size="sm">
                                  <ApperIcon name="ExternalLink" size={16} />
                                  Claim Perk
                                </Button>
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

export default BuyerDashboard;