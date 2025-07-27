import express from 'express';
import isAuth from '../middleware/isAuth.js';
// --- FIX: Import the new 'updateCart' function ---
import { addToCart, getUserCart, removeFromCart, updateCart } from '../controller/cartController.js';

const cartRoutes = express.Router();

cartRoutes.post('/get', isAuth, getUserCart);
cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/remove', isAuth, removeFromCart);

// --- FIX: Add the missing '/update' route ---
// This is the route your frontend is trying to call.
cartRoutes.post('/update', isAuth, updateCart);

export default cartRoutes;
