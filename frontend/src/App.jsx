// src/App.jsx
import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Collections from './pages/Collections.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './component/Nav.jsx';
import { userDataContext } from './context/UserContext.jsx';

// Import your new customer service pages
import FAQPage from './pages/FAQPage.jsx';
import ReturnsPage from './pages/ReturnsPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import HelpCenterPage from './pages/HelpCenterPage.jsx';

// NEW: Import DeliveryPage and TermsPage
import DeliveryPage from './pages/DeliveryPage.jsx';
import TermsPage from './pages/TermsPage.jsx';


function App() {
  const location = useLocation();
  const { userData } = useContext(userDataContext);

  // Helper component for protected routes to avoid repetition
  const ProtectedRoute = ({ children }) => {
    return userData ? children : <Navigate to="/login" state={{ from: location.pathname }} />;
  };

  return (
    <>
      <ToastContainer />
      {/* Conditionally render Nav based on userData, as you currently have */}
      {userData && <Nav />}

      <Routes>
        {/* Public Routes (or routes handling redirect logic) */}
        <Route
          path='/login'
          element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Login />)}
        />
        <Route
          path='/signup'
          element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Registration />)}
        />

        {/* Protected Routes - only accessible if userData exists */}
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='/collection' element={<ProtectedRoute><Collections /></ProtectedRoute>} />
        <Route path='/product' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />

        {/* Customer Service and Policy Pages */}
        <Route path='/faq' element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
        <Route path='/returns' element={<ProtectedRoute><ReturnsPage /></ProtectedRoute>} />
        <Route path='/shipping' element={<ProtectedRoute><ShippingPage /></ProtectedRoute>} />
        <Route path='/privacy-policy' element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
        <Route path='/help-center' element={<ProtectedRoute><HelpCenterPage /></ProtectedRoute>} />
        
        {/* NEW: Routes for Delivery and Terms */}
        <Route path='/delivery' element={<ProtectedRoute><DeliveryPage /></ProtectedRoute>} />
        <Route path='/terms' element={<ProtectedRoute><TermsPage /></ProtectedRoute>} />

        {/* You might want a catch-all route for 404 pages */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;