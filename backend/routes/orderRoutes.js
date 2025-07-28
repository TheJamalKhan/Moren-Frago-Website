import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import {
    placeOrder,
    userOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus // <-- Import the new controller function
} from '../controller/orderController.js';

const orderRoutes = express.Router();

// --- ADMIN ROUTES ---
orderRoutes.get('/all', adminAuth, getAllOrders);
// --- NEW ROUTE FOR ADMINS TO UPDATE STATUS ---
orderRoutes.put('/status/:orderId', adminAuth, updateOrderStatus);


// --- USER ROUTES ---
orderRoutes.post('/create', isAuth, placeOrder);
orderRoutes.get('/userorders', isAuth, userOrders);
orderRoutes.get('/:id', isAuth, getOrderById);

export default orderRoutes;
