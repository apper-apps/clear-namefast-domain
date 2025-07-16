import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Browse Domains", href: "/browse" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Seller Hub", href: "/seller" }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-surface-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://pagemaker.b-cdn.net/media/104939/1827x400.png" 
              alt="NameFast" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActivePath(item.href)
                    ? "text-primary-600"
                    : "text-surface-700 hover:text-primary-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">
                <ApperIcon name="User" size={20} />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="secondary">
                <ApperIcon name="Settings" size={20} />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-surface-600 hover:text-surface-800 hover:bg-surface-100"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-surface-200 py-4"
            >
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block font-medium py-2 transition-colors duration-200 ${
                      isActivePath(item.href)
                        ? "text-primary-600"
                        : "text-surface-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-4 border-t border-surface-200">
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <ApperIcon name="User" size={20} />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full justify-start">
                      <ApperIcon name="Settings" size={20} />
                      Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;