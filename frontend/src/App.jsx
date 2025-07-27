import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './component/Nav';
import { userDataContext } from './context/UserContext';

// Import your pages
import FAQPage from './pages/FAQPage';
import ReturnsPage from './pages/ReturnsPage';
import ShippingPage from './pages/ShippingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HelpCenterPage from './pages/HelpCenterPage';
import DeliveryPage from './pages/DeliveryPage';
import TermsPage from './pages/TermsPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart'; 
import CartSidePanel from './pages/CartSidePanel';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order'; 
import OrderDetail from './pages/OrderDetail';

// A simple loading component to show while we check auth
const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff' }}>
    <p>Loading...</p>
  </div>
);


const AppContent = () => {
  const location = useLocation();
  // --- UPDATED: Get both userData and the new loading state ---
  const { userData, loading } = useContext(userDataContext);

  const ProtectedRoute = ({ children }) => {
    // This logic now runs only AFTER the initial loading is false
    return userData ? children : <Navigate to="/login" state={{ from: location.pathname }} />;
  };

  // --- UPDATED: Wait for the initial auth check to complete ---
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}
      
      {userData && <CartSidePanel />}

      <Routes>
        {/* Public Routes */}
        <Route
          path='/login'
          element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Login />)}
        />
        <Route
          path='/signup'
          element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Registration />)}
        />

        {/* Protected Routes */}
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='/collection' element={<ProtectedRoute><Collections /></ProtectedRoute>} />
        <Route path='/product' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path='/productdetail/:id' element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path='/order' element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />

        {/* Customer Service and Policy Pages */}
        <Route path='/faq' element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
        <Route path='/returns' element={<ProtectedRoute><ReturnsPage /></ProtectedRoute>} />
        <Route path='/shipping' element={<ProtectedRoute><ShippingPage /></ProtectedRoute>} />
        <Route path='/privacy-policy' element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
        <Route path='/help-center' element={<ProtectedRoute><HelpCenterPage /></ProtectedRoute>} />
        <Route path='/delivery' element={<ProtectedRoute><DeliveryPage /></ProtectedRoute>} />
        <Route path='/terms' element={<ProtectedRoute><TermsPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
