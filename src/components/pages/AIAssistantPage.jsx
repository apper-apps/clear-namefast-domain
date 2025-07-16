import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";

const AIAssistantPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: "",
    keywords: "",
    industry: "",
    tone: "",
    length: "",
    extension: ""
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const businessTypes = [
    "Startup",
    "E-commerce",
    "SaaS",
    "Consulting",
    "Agency",
    "Blog",
    "Portfolio",
    "Non-profit",
    "Restaurant",
    "Real Estate"
  ];

  const industries = [
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

  const tones = [
    "Professional",
    "Creative",
    "Modern",
    "Playful",
    "Elegant",
    "Bold",
    "Minimalist",
    "Tech-focused"
  ];

  const lengths = [
    "Short (4-6 characters)",
    "Medium (7-10 characters)",
    "Long (11+ characters)",
    "Any length"
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
    ".ai",
    "Any extension"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSuggestions = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI suggestions based on input
    const mockSuggestions = [
      { name: "innovatefast.com", price: 2500, available: true, score: 95 },
      { name: "swiftventure.io", price: 1800, available: true, score: 92 },
      { name: "nexustech.co", price: 3200, available: false, score: 89 },
      { name: "rapidgrow.app", price: 1500, available: true, score: 87 },
      { name: "smartflow.dev", price: 2100, available: true, score: 85 },
      { name: "boostlab.net", price: 1200, available: true, score: 83 }
    ];

    setSuggestions(mockSuggestions);
    setLoading(false);
  };

  const handleSearch = (domainName) => {
    navigate(`/browse?search=${encodeURIComponent(domainName.replace(/\.(com|io|net|org|co|app|dev|tech|ai)$/, ""))}`);
  };

  return (
    <div className="min-h-screen bg-surface-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-surface-800 mb-4">
              AI Domain Assistant
            </h1>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              Get intelligent domain name suggestions powered by AI. Tell us about your business and preferences, and we'll find the perfect domain for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-surface-800 mb-6 flex items-center gap-2">
                <ApperIcon name="Sparkles" size={24} />
                Tell Us About Your Business
              </h2>

              <div className="space-y-6">
                <div>
                  <Label>Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onChange={(e) => handleInputChange("businessType", e.target.value)}
                  >
                    <option value="">Select your business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </div>

                <FormField
                  label="Keywords"
                  placeholder="e.g. fast, smart, innovative, tech"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange("keywords", e.target.value)}
                />

                <div>
                  <Label>Industry</Label>
                  <Select
                    value={formData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label>Preferred Tone</Label>
                  <Select
                    value={formData.tone}
                    onChange={(e) => handleInputChange("tone", e.target.value)}
                  >
                    <option value="">Select preferred tone</option>
                    {tones.map(tone => (
                      <option key={tone} value={tone}>{tone}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label>Preferred Length</Label>
                  <Select
                    value={formData.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                  >
                    <option value="">Select preferred length</option>
                    {lengths.map(length => (
                      <option key={length} value={length}>{length}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label>Preferred Extension</Label>
                  <Select
                    value={formData.extension}
                    onChange={(e) => handleInputChange("extension", e.target.value)}
                  >
                    <option value="">Select preferred extension</option>
                    {extensions.map(ext => (
                      <option key={ext} value={ext}>{ext}</option>
                    ))}
                  </Select>
                </div>

                <Button
                  onClick={generateSuggestions}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading || !formData.businessType || !formData.keywords}
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" size={20} className="animate-spin" />
                      Generating Suggestions...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Sparkles" size={20} />
                      Generate Domain Suggestions
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {loading && (
                <div className="bg-white rounded-xl p-8 shadow-card">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="Brain" size={32} className="text-white animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-800 mb-2">
                      AI is analyzing your requirements...
                    </h3>
                    <p className="text-surface-600">
                      Finding the perfect domain names for your business
                    </p>
                  </div>
                </div>
              )}

              {suggestions.length > 0 && !loading && (
                <div className="bg-white rounded-xl p-8 shadow-card">
                  <h2 className="text-2xl font-bold text-surface-800 mb-6 flex items-center gap-2">
                    <ApperIcon name="Lightbulb" size={24} />
                    AI Suggestions
                  </h2>

                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-surface-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-surface-800">
                              {suggestion.name}
                            </h3>
                            <div className="flex items-center gap-1">
                              <ApperIcon name="Star" size={16} className="text-orange-500" />
                              <span className="text-sm font-medium text-surface-600">
                                {suggestion.score}% match
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {suggestion.available ? (
                              <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                                Available
                              </span>
                            ) : (
                              <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                                Taken
                              </span>
                            )}
                            <span className="text-lg font-bold text-surface-800">
                              ${suggestion.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-surface-600">
                            <div className="flex items-center gap-1">
                              <ApperIcon name="TrendingUp" size={14} />
                              <span>High brandability</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ApperIcon name="Zap" size={14} />
                              <span>SEO friendly</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSearch(suggestion.name)}
                            >
                              <ApperIcon name="Search" size={16} />
                              Search Similar
                            </Button>
                            {suggestion.available && (
                              <Button variant="primary" size="sm">
                                <ApperIcon name="ShoppingCart" size={16} />
                                Purchase
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="secondary" onClick={generateSuggestions}>
                      <ApperIcon name="RefreshCw" size={20} />
                      Generate More Suggestions
                    </Button>
                  </div>
                </div>
              )}

              {suggestions.length === 0 && !loading && (
                <div className="bg-white rounded-xl p-8 shadow-card text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Robot" size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-surface-800 mb-2">
                    Ready to Find Your Perfect Domain?
                  </h3>
                  <p className="text-surface-600 mb-4">
                    Fill out the form to get personalized AI-powered domain suggestions
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-surface-500">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Check" size={14} />
                      <span>AI-powered</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Check" size={14} />
                      <span>Instant results</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Check" size={14} />
                      <span>Brandable names</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-surface-800 text-center mb-8">
              How Our AI Assistant Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="MessageSquare" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-800 mb-3">
                  Tell Us Your Needs
                </h3>
                <p className="text-surface-600">
                  Share your business type, keywords, and preferences to help our AI understand your requirements.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Brain" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-800 mb-3">
                  AI Analysis
                </h3>
                <p className="text-surface-600">
                  Our advanced AI analyzes millions of domain combinations to find names that match your brand perfectly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Star" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-800 mb-3">
                  Perfect Matches
                </h3>
                <p className="text-surface-600">
                  Get ranked suggestions with availability, pricing, and brandability scores to make the best choice.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistantPage;