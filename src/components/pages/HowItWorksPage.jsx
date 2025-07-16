import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HowItWorksPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Browse & Search",
      description: "Explore our curated collection of premium domains or use our AI assistant to get personalized suggestions based on your business needs.",
      icon: "Search",
      features: ["Expert-curated listings", "AI-powered suggestions", "Advanced search filters", "Category browsing"]
    },
    {
      number: "02", 
      title: "Select Your Domain",
      description: "Found the perfect domain? Review all the details, check availability, and see our competitive pricing that's 20-30% lower than competitors.",
      icon: "MousePointer",
      features: ["Detailed domain information", "Competitive pricing", "Instant availability check", "Quality guarantees"]
    },
    {
      number: "03",
      title: "Secure Purchase",
      description: "Complete your purchase with confidence using our secure payment system. Your funds are held in escrow until successful transfer.",
      icon: "CreditCard",
      features: ["Secure payment processing", "Escrow protection", "Multiple payment options", "Instant confirmation"]
    },
    {
      number: "04",
      title: "Fast Transfer",
      description: "Our experts handle the entire transfer process. Track progress in real-time and receive your domain within 24-48 hours on average.",
      icon: "RotateCcw",
      features: ["Expert transfer management", "Real-time tracking", "24-48 hour completion", "Dedicated support"]
    },
    {
      number: "05",
      title: "Get Started",
      description: "Domain transferred successfully! Access your FounderPass perks worth $2,000+ in startup tools and resources to accelerate your business.",
      icon: "Rocket",
      features: ["Successful domain transfer", "FounderPass perks included", "Startup tool access", "Ongoing support"]
    }
  ];

  const benefits = [
    {
      icon: "Shield",
      title: "100% Secure",
      description: "All transactions protected by escrow until successful transfer"
    },
    {
      icon: "Clock",
      title: "Fast Transfer",
      description: "Average 24-48 hour transfer time with real-time tracking"
    },
    {
      icon: "DollarSign",
      title: "Best Prices",
      description: "20-30% lower prices than competitors, guaranteed"
    },
    {
      icon: "Users",
      title: "Expert Support",
      description: "Dedicated transfer specialists available 24/7"
    },
    {
      icon: "Gift",
      title: "Bonus Perks",
      description: "$2,000+ in FounderPass startup tools included free"
    },
    {
      icon: "CheckCircle",
      title: "Quality Guaranteed",
      description: "All domains verified and curated by our experts"
    }
  ];

  const faqs = [
    {
      question: "How long does the domain transfer process take?",
      answer: "Most domain transfers complete within 24-48 hours. Our expert team handles all the technical details while you track progress in real-time through your dashboard."
    },
    {
      question: "What happens if the transfer fails?",
      answer: "If a transfer fails, you receive a full refund immediately. We also offer a 30-day money-back guarantee for additional peace of mind."
    },
    {
      question: "Are your prices really 20-30% lower?",
      answer: "Yes! We negotiate directly with domain owners and operate with lower margins to provide the best prices. If you find a lower price elsewhere, we'll match it."
    },
    {
      question: "What are FounderPass perks?",
      answer: "FounderPass provides access to $2,000+ worth of startup tools including web hosting credits, design software, marketing platforms, and business templates."
    },
    {
      question: "Do you provide support during the transfer?",
      answer: "Absolutely! Our transfer specialists are available 24/7 to assist with any questions or issues. You can reach us through live chat, email, or phone."
    },
    {
      question: "Can I transfer my domain to any registrar?",
      answer: "Yes, you can transfer your domain to any registrar of your choice. We support all major registrars including Namecheap, GoDaddy, and Google Domains."
    }
  ];

  return (
    <div className="min-h-screen bg-surface-100">
      {/* Hero Section */}
      <section className="bg-gradient-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-surface-800 mb-6">
              How NameFast Works
            </h1>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto mb-8">
              From discovery to transfer, we've streamlined the entire domain acquisition process. 
              Get your perfect domain in just a few simple steps.
            </p>
            <Button onClick={() => navigate("/browse")} variant="primary" size="lg">
              <ApperIcon name="Search" size={20} />
              Start Browsing Domains
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-surface-800 mb-4">
              5 Simple Steps to Your Perfect Domain
            </h2>
            <p className="text-xl text-surface-600">
              Our streamlined process makes domain acquisition fast, secure, and hassle-free
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <ApperIcon name={step.icon} size={32} className="text-white" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold gradient-text mb-2">{step.number}</div>
                      <h3 className="text-2xl font-bold text-surface-800">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-surface-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {step.features.map(feature => (
                      <div key={feature} className="flex items-center gap-2">
                        <ApperIcon name="Check" size={16} className="text-green-500" />
                        <span className="text-sm text-surface-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="bg-gradient-surface rounded-2xl p-8 shadow-premium">
                    <div className="w-full h-64 bg-surface-300 rounded-xl flex items-center justify-center">
                      <ApperIcon name={step.icon} size={64} className="text-surface-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-surface-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-surface-800 mb-4">
              Why Choose NameFast?
            </h2>
            <p className="text-xl text-surface-600">
              We've built the most trusted and efficient domain marketplace for entrepreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name={benefit.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-surface-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FounderPass Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h2 className="text-4xl font-bold mb-6">
              $2,000+ in Startup Tools Included Free
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Every domain purchase includes access to FounderPass perks: web hosting credits, 
              design tools, marketing software, and business templates to accelerate your startup journey.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <ApperIcon name="Server" size={32} className="mx-auto mb-2" />
                <div className="text-sm">Web Hosting</div>
              </div>
              <div className="text-center">
                <ApperIcon name="Palette" size={32} className="mx-auto mb-2" />
                <div className="text-sm">Design Tools</div>
              </div>
              <div className="text-center">
                <ApperIcon name="TrendingUp" size={32} className="mx-auto mb-2" />
                <div className="text-sm">Marketing</div>
              </div>
              <div className="text-center">
                <ApperIcon name="FileText" size={32} className="mx-auto mb-2" />
                <div className="text-sm">Templates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-surface-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-surface-600">
              Get answers to common questions about our domain transfer process
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-surface-800 mb-3 flex items-center gap-2">
                  <ApperIcon name="HelpCircle" size={20} className="text-primary-600" />
                  {faq.question}
                </h3>
                <p className="text-surface-700 leading-relaxed">
                  {faq.answer}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-surface-600 mb-8">
              Join thousands of entrepreneurs who have found their perfect domain with NameFast
            </p>
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
    </div>
  );
};

export default HowItWorksPage;