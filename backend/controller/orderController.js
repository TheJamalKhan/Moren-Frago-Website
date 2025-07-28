import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";

// --- NEW FUNCTION FOR ADMINS ---
/**
 * [ADMIN] Updates the status of a specific order.
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "New status is required." });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, message: "Order status updated successfully.", data: updatedOrder });

    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ success: false, message: "Error updating order status." });
    }
};


// --- EXISTING FUNCTIONS ---

/**
 * [ADMIN] Fetches all orders from all users.
 */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'name email').sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Get All Orders Error:", error);
        res.status(500).json({ success: false, message: 'Error fetching all orders' });
    }
};

/**
 * Creates a new order.
 */
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication failed." });

        let orderItems = [];
        for (const item of items) {
            const productData = await Product.findById(item.productId || item._id);
            if (productData) {
                orderItems.push({
                    productId: productData._id,
                    name: productData.name,
                    image: productData.image1,
                    price: productData.price,
                    quantity: item.quantity,
                    size: item.size
                });
            }
        }

        if (orderItems.length !== items.length) {
            return res.status(404).json({ success: false, message: 'One or more products were not found.' });
        }

        const newOrder = new Order({ items: orderItems, amount, userId, address, paymentMethod, date: Date.now() });
        await newOrder.save();
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
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication failed." });
        
        const orders = await Order.find({ userId: userId }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Get User Orders Error:", error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};

/**
 * Fetches a single order by its ID.
 */
export const getOrderById = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication failed." });

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (userId !== order.userId.toString()) return res.status(403).json({ success: false, message: "Unauthorized access" });

        res.json({ success: true, data: order });
    } catch (error) {
        console.log("Get Order By ID Error:", error);
        res.status(500).json({ success: false, message: "Error fetching order details" });
    }
};
