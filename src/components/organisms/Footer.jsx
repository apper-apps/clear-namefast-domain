import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <footer className="bg-surface-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div className="space-y-4">
            <img 
              src="https://pagemaker.b-cdn.net/media/104939/1827x400.png" 
              alt="NameFast" 
              className="h-8 w-auto filter brightness-0 invert"
            />
            <p className="text-surface-300 text-sm">
              Premium domain marketplace connecting entrepreneurs with quality domains at competitive prices.
            </p>
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.prod.website-files.com/604637da1d40366d4e19de8e/6304f48a0cc2726f9f3df4f5_Pass%20(10)-p-500.png" 
                alt="FounderPass" 
                className="h-6 w-auto"
              />
              <span className="text-sm text-surface-300">Exclusive perks included</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Products</h3>
            <div className="space-y-2">
              <Link to="/browse" className="block text-surface-300 hover:text-white transition-colors text-sm">
                Browse Domains
              </Link>
              <Link to="/ai-assistant" className="block text-surface-300 hover:text-white transition-colors text-sm">
                AI Assistant
              </Link>
              <Link to="/seller" className="block text-surface-300 hover:text-white transition-colors text-sm">
                Sell Domains
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <div className="space-y-2">
              <Link to="/how-it-works" className="block text-surface-300 hover:text-white transition-colors text-sm">
                How It Works
              </Link>
              <a href="#" className="block text-surface-300 hover:text-white transition-colors text-sm">
                Contact Support
              </a>
              <a href="#" className="block text-surface-300 hover:text-white transition-colors text-sm">
                Transfer Guide
              </a>
              <a href="#" className="block text-surface-300 hover:text-white transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>

          {/* Trust & Security */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Trust & Security</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" size={16} className="text-green-400" />
                <span className="text-sm text-surface-300">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="CheckCircle" size={16} className="text-green-400" />
                <span className="text-sm text-surface-300">Verified Domains</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="DollarSign" size={16} className="text-green-400" />
                <span className="text-sm text-surface-300">Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="RotateCcw" size={16} className="text-green-400" />
                <span className="text-sm text-surface-300">30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-surface-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-surface-400 text-sm">
            © 2024 NameFast. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-surface-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-surface-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-surface-400 hover:text-white transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;