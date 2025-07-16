import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { domainService } from "@/services/api/domainService";
import { purchaseService } from "@/services/api/purchaseService";

const PurchasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchasing, setPurchasing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    paymentMethod: "stripe",
    acceptTerms: false
  });

  const [formErrors, setFormErrors] = useState({});

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.acceptTerms) errors.acceptTerms = "You must accept the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      setPurchasing(true);
      
      const purchaseData = {
        domainId: parseInt(id),
        buyerEmail: formData.email,
        buyerName: `${formData.firstName} ${formData.lastName}`,
        company: formData.company,
        phone: formData.phone,
        amount: domain.price,
        paymentMethod: formData.paymentMethod
      };

      const purchase = await purchaseService.create(purchaseData);
      
      toast.success("Purchase successful! You will receive confirmation shortly.");
      navigate(`/dashboard?purchase=${purchase.Id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDomain} />;
  if (!domain) return <Error message="Domain not found" />;

  return (
    <div className="min-h-screen bg-surface-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-surface-800 mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-xl text-surface-600">
              You're purchasing <span className="font-semibold text-primary-600">{domain.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Purchase Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePurchase} className="space-y-8">
                {/* Buyer Information */}
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-surface-800 mb-6 flex items-center gap-2">
                    <ApperIcon name="User" size={20} />
                    Buyer Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      error={formErrors.firstName}
                      required
                    />
                    <FormField
                      label="Last Name"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      error={formErrors.lastName}
                      required
                    />
                    <FormField
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      error={formErrors.email}
                      required
                      className="md:col-span-2"
                    />
                    <FormField
                      label="Company (Optional)"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                    <FormField
                      label="Phone (Optional)"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-surface-800 mb-6 flex items-center gap-2">
                    <ApperIcon name="CreditCard" size={20} />
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-surface-300 rounded-lg cursor-pointer hover:border-primary-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={formData.paymentMethod === "stripe"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="text-primary-600"
                      />
                      <div className="flex items-center gap-2">
                        <ApperIcon name="CreditCard" size={20} />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <div className="ml-auto text-sm text-surface-500">Secure via Stripe</div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-surface-300 rounded-lg cursor-pointer hover:border-primary-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="text-primary-600"
                      />
                      <div className="flex items-center gap-2">
                        <ApperIcon name="DollarSign" size={20} />
                        <span className="font-medium">PayPal</span>
                      </div>
                      <div className="ml-auto text-sm text-surface-500">Fast & secure</div>
                    </label>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-surface-800 mb-6 flex items-center gap-2">
                    <ApperIcon name="FileText" size={20} />
                    Terms & Conditions
                  </h2>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                        className="mt-1 text-primary-600"
                      />
                      <div className="text-sm text-surface-700">
                        I agree to the{" "}
                        <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
                        I understand that this purchase is protected by escrow until successful domain transfer.
                      </div>
                    </label>
                    {formErrors.acceptTerms && (
                      <p className="text-sm text-accent-500">{formErrors.acceptTerms}</p>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={purchasing}
                >
                  {purchasing ? (
                    <>
                      <ApperIcon name="Loader2" size={20} className="animate-spin" />
                      Processing Purchase...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Lock" size={20} />
                      Complete Secure Purchase
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-card sticky top-6">
                <h3 className="text-lg font-semibold text-surface-800 mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-surface-800">{domain.name}</span>
                  </div>
                  
                  <div className="border-t border-surface-200 pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="gradient-text">${domain.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-surface-600">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Shield" size={16} className="text-green-500" />
                    <span>Protected by escrow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Clock" size={16} className="text-blue-500" />
                    <span>Transfer within 24-48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="RefreshCw" size={16} className="text-orange-500" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </div>

              {/* FounderPass Bonus */}
              <div className="bg-gradient-primary rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src="https://cdn.prod.website-files.com/604637da1d40366d4e19de8e/6304f48a0cc2726f9f3df4f5_Pass%20(10)-p-500.png" 
                    alt="FounderPass" 
                    className="h-5 w-auto"
                  />
                  <span className="font-semibold">Included Free</span>
                </div>
                <h4 className="font-bold mb-2">$2,000+ in Startup Tools</h4>
                <p className="text-sm text-white/90">
                  Get exclusive access to premium startup tools and resources to accelerate your business growth.
                </p>
              </div>

              {/* Security Notice */}
              <div className="bg-surface-50 rounded-xl p-4 border border-surface-200">
                <div className="flex items-start gap-3">
                  <ApperIcon name="Lock" size={20} className="text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-surface-800 mb-1">Secure Purchase</h4>
                    <p className="text-sm text-surface-600">
                      Your payment is processed securely and funds are held in escrow until successful domain transfer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PurchasePage;