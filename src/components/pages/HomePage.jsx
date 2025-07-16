import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import DomainCard from "@/components/molecules/DomainCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { domainService } from "@/services/api/domainService";

const HomePage = () => {
  const [featuredDomains, setFeaturedDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadFeaturedDomains = async () => {
    try {
      setLoading(true);
      setError("");
      const domains = await domainService.getAll();
      setFeaturedDomains(domains.slice(0, 6));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedDomains();
  }, []);

  const stats = [
    { number: "10,000+", label: "Premium Domains", icon: "Globe" },
    { number: "5,000+", label: "Happy Customers", icon: "Users" },
    { number: "24h", label: "Average Transfer", icon: "Clock" },
    { number: "99.9%", label: "Success Rate", icon: "TrendingUp" }
  ];

  const features = [
    {
      icon: "Sparkles",
      title: "AI-Powered Naming",
      description: "Get intelligent domain suggestions based on your business type and preferences"
    },
    {
      icon: "Shield",
      title: "Secure Transfers",
      description: "Safe escrow system protects your purchase until successful domain transfer"
    },
    {
      icon: "Zap",
      title: "Fast Processing",
      description: "Average transfer time of 24 hours with real-time status tracking"
    },
    {
      icon: "Gift",
      title: "FounderPass Perks",
      description: "Exclusive discounts and tools for entrepreneurs and startups"
    }
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadFeaturedDomains} />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-surface-800 mb-6">
              Find Your Perfect
              <span className="gradient-text block">Domain Name</span>
            </h1>
            <p className="text-xl text-surface-600 mb-8 max-w-3xl mx-auto">
              Discover premium, curated domain names at competitive prices. Get AI-powered suggestions and exclusive FounderPass perks to accelerate your startup journey.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar size="lg" placeholder="Search for your perfect domain..." />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => navigate("/browse")} variant="primary" size="lg">
                <ApperIcon name="Search" size={20} />
                Browse Domains
              </Button>
              <Button onClick={() => navigate("/ai-assistant")} variant="secondary" size="lg">
                <ApperIcon name="Sparkles" size={20} />
                Try AI Assistant
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} size={24} className="text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-surface-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FounderPass Banner */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="https://cdn.prod.website-files.com/604637da1d40366d4e19de8e/6304f48a0cc2726f9f3df4f5_Pass%20(10)-p-500.png" 
                alt="FounderPass" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold">Exclusive Partnership</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Get FounderPass Perks with Every Purchase</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Access exclusive discounts on startup tools, hosting services, and business resources worth thousands of dollars.
            </p>
            <Button variant="secondary" size="lg">
              <ApperIcon name="Gift" size={20} />
              Learn More About Perks
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Domains */}
      <section className="py-20 bg-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-surface-800 mb-4">
              Featured Premium Domains
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              Hand-picked selection of our best domains, curated for entrepreneurs and startups
            </p>
          </motion.div>

          {featuredDomains.length === 0 ? (
            <Empty 
              title="No featured domains available"
              description="Our featured domains are being updated. Check back soon or browse all available domains."
              actionText="Browse All Domains"
              icon="Star"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredDomains.map((domain, index) => (
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
          )}

          <div className="text-center">
            <Button onClick={() => navigate("/browse")} variant="primary" size="lg">
              <ApperIcon name="ArrowRight" size={20} />
              View All Domains
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-surface-800 mb-4">
              Why Choose NameFast?
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              We make domain acquisition simple, secure, and affordable for entrepreneurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-surface-800 mb-4">
              Ready to Find Your Domain?
            </h2>
            <p className="text-xl text-surface-600 mb-8">
              Join thousands of entrepreneurs who trust NameFast for their domain needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => navigate("/browse")} variant="primary" size="lg">
                <ApperIcon name="Search" size={20} />
                Start Browsing
              </Button>
              <Button onClick={() => navigate("/seller")} variant="secondary" size="lg">
                <ApperIcon name="Plus" size={20} />
                Sell Your Domain
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;