import express from 'express';
import isAuth from '../middleware/isAuth.js';
// --- ADDED: Import the new controller functions ---
import { placeOrder, userOrders, getOrderById } from '../controller/orderController.js';

const orderRoutes = express.Router();

orderRoutes.post('/create', isAuth, placeOrder);
orderRoutes.get('/userorders', isAuth, userOrders);

// --- ADDED: New route to get a single order by its ID ---
orderRoutes.get('/:id', isAuth, getOrderById);

export default orderRoutes;
