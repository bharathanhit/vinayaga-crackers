import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, analytics } from './firebase';
import { logEvent } from 'firebase/analytics';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Certificates from './components/Certificates';
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

// Analytics Page View Tracker
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname,
        page_search: location.search
      });
    }
  }, [location]);

  return null;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
    const trackVisitor = async () => {
      if (!sessionStorage.getItem('hasVisited')) {
        sessionStorage.setItem('hasVisited', 'true');
        try {
          const docRef = doc(db, 'analytics', 'visitors');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await updateDoc(docRef, { count: increment(1) });
          } else {
            await setDoc(docRef, { count: 1 });
          }
        } catch (error) {
          console.error("Error tracking visitor:", error);
        }
      }
    };
    trackVisitor();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-secondary selection:text-white font-inter">
      <ScrollToTop />
      <AnalyticsTracker />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {/* Legacy /wood-crafts route removed — replaced by Vinayaga Crackers category routes */}
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
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
