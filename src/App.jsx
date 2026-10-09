import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import AdminProductFormPage from './components/AdminProductFormPage';
import AdminCategoryFormPage from './components/AdminCategoryFormPage';
import AboutPage from './components/AboutPage';
import CategoryPage from './components/CategoryPage';
import ServicesPage from './components/ServicesPage';
import PaymentTerms from './components/PaymentTerms';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingEnquiry from './components/FloatingEnquiry';
import WelcomePopup from './components/WelcomePopup';
import BuyingSection from './components/BuyingSection';
import SpecialBundlesPage from './components/SpecialBundlesPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-secondary selection:text-white font-inter">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/buy" element={<BuyingSection />} />
        <Route path="/price-list" element={<BuyingSection />} />
        <Route path="/order" element={<BuyingSection />} />
        <Route path="/quick-order" element={<BuyingSection />} />
        <Route path="/special-bundles" element={<SpecialBundlesPage />} />
        <Route path="/bundles" element={<SpecialBundlesPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/payment-terms" element={<PaymentTerms />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/product/new" element={<AdminProductFormPage />} />
        <Route path="/admin/product/edit/:docId" element={<AdminProductFormPage />} />
        <Route path="/admin/category/new" element={<AdminCategoryFormPage />} />
        <Route path="/admin/category/edit/:docId" element={<AdminCategoryFormPage />} />
        <Route path="*" element={<div className="pt-40 pb-24 min-h-screen flex items-center justify-center"><h1 className="text-4xl text-primary font-black">404 - Page Not Found</h1></div>} />
      </Routes>
      <FloatingEnquiry />
      <WelcomePopup />
      <Footer />
    </div>
  );
}

export default App;
