import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";

/**
 * Creates a new order, saving full item details for future display.
 */
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.userId;

        let orderItems = [];

        for (const item of items) {
            // --- FIX 1: Check for 'item.productId' or 'item._id' ---
            // This makes the code work even if the frontend sends '_id'.
            const productData = await Product.findById(item.productId || item._id);

            if (productData) {
                // Create a new object containing all necessary details for the order history
                orderItems.push({
                    productId: productData._id,
                    name: productData.name,
                    // --- FIX 2: Use 'image1' from the Product model ---
                    image: productData.image1,
                    price: productData.price,
                    quantity: item.quantity
                });
            }
        }

        // Check if any items were processed successfully
        if (orderItems.length !== items.length) {
            console.log("Could not find all products for the order.");
            return res.status(404).json({ success: false, message: 'One or more products in the cart were not found.' });
        }

        const orderData = {
            items: orderItems,
            amount,
            userId,
            address,
            paymentMethod: paymentMethod,
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        // After successful order, clear the user's cart
        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(201).json({ success: true, message: 'Order Placed Successfully' });
    } catch (error) {
        console.log("Place Order Error:", error);
        res.status(500).json({ success: false, message: 'Error placing order' });
    }
};

/**
 * Fetches all orders for the currently authenticated user.
 */
export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Get User Orders Error:", error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};

/**
 * Fetches a single order by its ID, ensuring the user is authorized.
 */
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Security check: Ensure the user requesting the order is the one who placed it
        if (req.userId !== order.userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        console.log("Get Order By ID Error:", error);
        res.status(500).json({ success: false, message: "Error fetching order details" });
    }
};