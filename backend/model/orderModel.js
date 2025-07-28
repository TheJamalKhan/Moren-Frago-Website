import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // --- THIS IS THE CORRECTED FIELD ---
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Must be ObjectId
        ref: 'User',                         // Must have a reference to the User model
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Order Placed'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;