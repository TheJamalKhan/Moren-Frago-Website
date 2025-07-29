import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import {
    placeOrder,
    userOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    createRazorpayOrder, // <-- Import new controller
    paymentVerification, // <-- Import new controller
} from '../controller/orderController.js';

const orderRoutes = express.Router();

// --- ADMIN ROUTES ---
orderRoutes.get('/all', adminAuth, getAllOrders);
orderRoutes.put('/status/:orderId', adminAuth, updateOrderStatus);

// --- USER ROUTES ---
// Existing route for COD orders
orderRoutes.post('/create', isAuth, placeOrder); 

// New routes for Razorpay payment
orderRoutes.post('/create-order', isAuth, createRazorpayOrder);
orderRoutes.post('/verify-payment', isAuth, paymentVerification);

orderRoutes.get('/userorders', isAuth, userOrders);
orderRoutes.get('/:id', isAuth, getOrderById);

export default orderRoutes;
