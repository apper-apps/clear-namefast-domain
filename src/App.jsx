import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import BrowsePage from "@/components/pages/BrowsePage";
import DomainDetailPage from "@/components/pages/DomainDetailPage";
import PurchasePage from "@/components/pages/PurchasePage";
import BuyerDashboard from "@/components/pages/BuyerDashboard";
import SellerPortal from "@/components/pages/SellerPortal";
import AdminPanel from "@/components/pages/AdminPanel";
import AIAssistantPage from "@/components/pages/AIAssistantPage";
import HowItWorksPage from "@/components/pages/HowItWorksPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/domain/:id" element={<DomainDetailPage />} />
          <Route path="/purchase/:id" element={<PurchasePage />} />
          <Route path="/dashboard" element={<BuyerDashboard />} />
          <Route path="/seller" element={<SellerPortal />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;