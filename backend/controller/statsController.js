import Order from '../model/orderModel.js';
import Product from '../model/productModel.js';
import User from '../model/userModel.js';

/**
 * [ADMIN] Fetches summary statistics for the dashboard.
 */
export const getSummary = async (req, res) => {
    try {
        // 1. Fetch all necessary counts and calculations in parallel for efficiency
        const [
            deliveredOrdersCount,
            pendingOrdersCount,
            totalProductsCount,
            totalUsersCount,
            allOrders
        ] = await Promise.all([
            Order.countDocuments({ status: 'Delivered' }),
            Order.countDocuments({ status: { $ne: 'Delivered' } }), // Counts all orders NOT marked as "Delivered"
            Product.countDocuments({}),
            User.countDocuments({}),
            Order.find({}, 'amount') // Fetch only the 'amount' for revenue calculation
        ]);

        // 2. Calculate total revenue from the fetched orders
        const totalRevenue = allOrders.reduce((sum, order) => sum + order.amount, 0);

        // 3. Send all live stats back in a single response
        res.json({
            success: true,
            data: {
                revenue: totalRevenue,
                pendingOrders: pendingOrdersCount,
                deliveredOrders: deliveredOrdersCount,
                products: totalProductsCount,
                users: totalUsersCount
            }
        });

    } catch (error) {
        console.error("Error fetching summary stats:", error);
        res.status(500).json({ success: false, message: "Server error while fetching stats." });
    }
};
