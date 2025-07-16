import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { domainService } from "@/services/api/domainService";
import { purchaseService } from "@/services/api/purchaseService";

const AdminPanel = () => {
  const [pendingDomains, setPendingDomains] = useState([]);
  const [allPurchases, setAllPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("approvals");
  const [processing, setProcessing] = useState({});

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [domains, purchases] = await Promise.all([
        domainService.getAll(),
        purchaseService.getAll()
      ]);
      
      setPendingDomains(domains.filter(d => d.status === "pending-approval"));
      setAllPurchases(purchases);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApproval = async (domainId, action) => {
    try {
      setProcessing(prev => ({ ...prev, [domainId]: true }));
      
      const newStatus = action === "approve" ? "approved" : "rejected";
      await domainService.update(domainId, { status: newStatus });
      
      setPendingDomains(prev => prev.filter(d => d.Id !== domainId));
      
      toast.success(`Domain ${action === "approve" ? "approved" : "rejected"} successfully!`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setProcessing(prev => ({ ...prev, [domainId]: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "processing": return "text-blue-600 bg-blue-100";
      case "pending": return "text-orange-600 bg-orange-100";
      case "cancelled": return "text-red-600 bg-red-100";
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
              Admin Panel
            </h1>
            <p className="text-xl text-surface-600">
              Manage domain approvals, purchases, and transfers
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
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Clock" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-surface-800">{pendingDomains.length}</div>
                      <div className="text-sm text-surface-600">Pending Approvals</div>
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
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <ApperIcon name="ShoppingBag" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-surface-800">{allPurchases.length}</div>
                      <div className="text-sm text-surface-600">Total Purchases</div>
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
                      <ApperIcon name="RotateCcw" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-surface-800">
                        {allPurchases.filter(p => p.transferStatus === "in-progress").length}
                      </div>
                      <div className="text-sm text-surface-600">Active Transfers</div>
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
                        ${allPurchases.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-surface-600">Total Revenue</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-card mb-8">
                <div className="border-b border-surface-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("approvals")}
                      className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                        activeTab === "approvals"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-surface-600 hover:text-surface-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ApperIcon name="CheckSquare" size={20} />
                        Domain Approvals ({pendingDomains.length})
                      </div>
                    </button>
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
                        Purchase Management
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "approvals" && (
                    <div>
                      {pendingDomains.length === 0 ? (
                        <Empty 
                          title="No pending approvals"
                          description="All domain submissions have been reviewed. New submissions will appear here for approval."
                          actionText="Refresh"
                          actionPath="#"
                          icon="CheckCircle"
                        />
                      ) : (
                        <div className="space-y-6">
                          {pendingDomains.map((domain, index) => (
                            <motion.div
                              key={domain.Id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border border-surface-200 rounded-lg p-6"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-xl font-semibold text-surface-800 mb-2">
                                    {domain.name}
                                  </h3>
                                  <div className="flex items-center gap-4 mb-3">
                                    <span className="text-sm bg-surface-100 text-surface-600 px-2 py-1 rounded">
                                      {domain.category}
                                    </span>
                                    <span className="text-sm bg-primary-50 text-primary-600 px-2 py-1 rounded">
                                      {domain.extension}
                                    </span>
                                    <span className="text-lg font-bold text-surface-800">
                                      ${domain.price.toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-surface-600 mb-4">{domain.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-surface-500">
                                    <div className="flex items-center gap-1">
                                      <ApperIcon name="Calendar" size={14} />
                                      <span>Submitted {new Date(domain.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <ApperIcon name="User" size={14} />
                                      <span>Seller ID: {domain.sellerId}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Quality Checks */}
                              <div className="bg-surface-50 rounded-lg p-4 mb-4">
                                <h4 className="font-medium text-surface-800 mb-3">Quality Checks</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  <div className="flex items-center gap-2">
                                    <ApperIcon name="CheckCircle" size={16} className="text-green-500" />
                                    <span className="text-sm text-surface-600">Profanity Check</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <ApperIcon name="CheckCircle" size={16} className="text-green-500" />
                                    <span className="text-sm text-surface-600">Trademark Check</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <ApperIcon name="CheckCircle" size={16} className="text-green-500" />
                                    <span className="text-sm text-surface-600">Length Check</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <ApperIcon name="CheckCircle" size={16} className="text-green-500" />
                                    <span className="text-sm text-surface-600">Format Check</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-3">
                                <Button
                                  onClick={() => handleApproval(domain.Id, "approve")}
                                  variant="primary"
                                  disabled={processing[domain.Id]}
                                >
                                  {processing[domain.Id] ? (
                                    <>
                                      <ApperIcon name="Loader2" size={16} className="animate-spin" />
                                      Processing...
                                    </>
                                  ) : (
                                    <>
                                      <ApperIcon name="Check" size={16} />
                                      Approve
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={() => handleApproval(domain.Id, "reject")}
                                  variant="secondary"
                                  disabled={processing[domain.Id]}
                                >
                                  <ApperIcon name="X" size={16} />
                                  Reject
                                </Button>
                                <Button variant="ghost">
                                  <ApperIcon name="MessageSquare" size={16} />
                                  Request Changes
                                </Button>
                                <Button variant="ghost">
                                  <ApperIcon name="ExternalLink" size={16} />
                                  Preview
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "purchases" && (
                    <div>
                      {allPurchases.length === 0 ? (
                        <Empty 
                          title="No purchases yet"
                          description="Purchase transactions will appear here for monitoring and management."
                          actionText="Refresh"
                          actionPath="#"
                          icon="ShoppingBag"
                        />
                      ) : (
                        <div className="space-y-4">
                          {allPurchases.map((purchase, index) => (
                            <motion.div
                              key={purchase.Id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border border-surface-200 rounded-lg p-6"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-surface-800">
                                    Purchase #{purchase.Id}
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
                                    <ApperIcon name="User" size={14} />
                                    <span>Buyer ID: {purchase.buyerId}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ApperIcon name="Globe" size={14} />
                                    <span>Domain ID: {purchase.domainId}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="Eye" size={16} />
                                    View Details
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="MessageCircle" size={16} />
                                    Contact Buyer
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ApperIcon name="Settings" size={16} />
                                    Manage Transfer
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

export default AdminPanel;