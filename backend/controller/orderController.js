import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";
import { instance } from '../index.js';
import crypto from 'crypto';

// --- RAZORPAY ORDER CREATION ---
export const createRazorpayOrder = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Create Razorpay Order Error:", error);
        res.status(500).json({ success: false, message: "Error creating Razorpay order." });
    }
};

// --- PAYMENT VERIFICATION ---
export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, amount, address } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Authentication failed. User not found." });
        }
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Missing required payment verification data." });
        }
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            if (!items || !Array.isArray(items)) {
                return res.status(400).json({ success: false, message: "Order items are missing or invalid." });
            }

            let orderItems = [];
            for (const item of items) {
                const productData = await Product.findById(item.productId);
                if (productData) {
                    orderItems.push({
                        productId: productData._id, name: productData.name, image: productData.image1,
                        price: productData.price, quantity: item.quantity, size: item.size
                    });
                }
            }

            if (orderItems.length !== items.length) {
                return res.status(404).json({ success: false, message: 'One or more products were not found.' });
            }

            await Order.create({
                items: orderItems,
                amount,
                userId,
                address,
                paymentMethod: 'Online',
                payment: true, // --- FIX: Explicitly set payment status to true for online orders ---
                paymentDetails: { orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature: razorpay_signature },
                date: Date.now()
            });

            await User.findByIdAndUpdate(userId, { cartData: {} });
            res.status(200).json({ success: true, message: "Payment successful and order created." });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed." });
        }
    } catch (error) {
        console.error("--- FATAL ERROR DURING PAYMENT VERIFICATION ---", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
};

// --- COD ORDER ---
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication failed." });

        let orderItems = [];
        for (const item of items) {
            const productData = await Product.findById(item.productId);
            if (productData) {
                orderItems.push({
                    productId: productData._id, name: productData.name, image: productData.image1,
                    price: productData.price, quantity: item.quantity, size: item.size
                });
            }
        }

        if (orderItems.length !== items.length) {
            return res.status(404).json({ success: false, message: 'One or more products were not found.' });
        }

        // For COD, the default payment: false in the schema is correct
        await Order.create({ items: orderItems, amount, userId, address, paymentMethod, date: Date.now() });
        await User.findByIdAndUpdate(userId, { cartData: {} });
        res.status(201).json({ success: true, message: 'Order Placed Successfully' });
    } catch (error) {
        console.error("Place Order Error:", error);
        res.status(500).json({ success: false, message: 'Error placing order' });
    }
};

// --- ADMIN: UPDATE ORDER STATUS ---
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if (!status) return res.status(400).json({ success: false, message: "New status is required." });
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found." });
        res.json({ success: true, message: "Order status updated.", data: updatedOrder });
    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ success: false, message: "Error updating order status." });
    }
};

// --- ADMIN: GET ALL ORDERS ---
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'name email').sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Get All Orders Error:", error);
        res.status(500).json({ success: false, message: 'Error fetching all orders' });
    }
};

// --- USER: GET THEIR OWN ORDERS ---
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication failed." });
        const orders = await Order.find({ userId }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Get User Orders Error:", error);
        res.status(500).json({ success: false, message: 'Error fetching your orders' });
    }
};

// --- USER: GET ONE ORDER BY ID ---
export const getOrderById = async (req, res) => {
    try {
        const userId = req.userId;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (userId !== order.userId.toString()) return res.status(403).json({ success: false, message: "Unauthorized access" });
        res.json({ success: true, data: order });
    } catch (error) {
        console.error("Get Order By ID Error:", error);
        res.status(500).json({ success: false, message: "Error fetching order details" });
    }
};
