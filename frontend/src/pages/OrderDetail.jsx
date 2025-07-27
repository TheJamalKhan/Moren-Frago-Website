import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { FiArrowLeft, FiPackage, FiCalendar, FiCreditCard, FiMapPin, FiHash } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

const OrderDetail = () => {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/order/${orderId}`, { withCredentials: true });
                if (response.data.success) {
                    setOrder(response.data.data);
                } else {
                    console.error("Could not fetch order details:", response.data.message);
                    navigate('/order');
                }
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId, serverUrl, navigate]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3]"><p className="text-lg text-[#4A2E2A]">Loading Order Details...</p></div>;
    }

    if (!order) {
        return <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3]"><p className="text-lg text-red-600">Order not found.</p></div>;
    }

    const getStatusChipStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-purple-100 text-purple-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen pt-24 md:pt-28 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/order')} className="flex items-center gap-2 text-[#4A2E2A] font-semibold mb-6 hover:text-[#d97706] transition-colors">
                    <FiArrowLeft />
                    Back to My Orders
                </button>

                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Order Details</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <FiHash /> ID: #{order._id.slice(-6)}
                            </p>
                        </div>
                         <span className={`mt-3 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1.5 ${getStatusChipStyle(order.status)}`}>
                            <FiPackage />
                            {order.status}
                        </span>
                    </div>

                    {/* Items List */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Items in this Order</h2>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    {/* --- THIS IS THE FIX --- */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name || 'Product Image'} 
                                        className="w-16 h-16 object-cover rounded-md bg-gray-200"
                                        // Provides a fallback for broken images
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/F3D9C8/4A2E2A?text=Img"; }}
                                    />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800">{item.name || 'Product Name Not Available'}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity || 0}</p>
                                    </div>
                                    <p className="font-semibold text-gray-800">
                                        ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary & Shipping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex justify-between"><span className="font-semibold">Order Date:</span> {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <p className="flex justify-between"><span className="font-semibold">Payment Method:</span> {order.payment ? "Paid" : "Cash on Delivery"}</p>
                                <hr className="my-2"/>
                                <p className="flex justify-between text-lg font-bold text-gray-800"><span >Total Amount:</span> <span>₹{order.amount.toLocaleString('en-IN')}</span></p>
                            </div>
                        </div>
                        <div>
                             <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
                             <div className="text-gray-700 leading-relaxed">
                                <p>{order.address.firstName} {order.address.lastName}</p>
                                <p>{order.address.address}</p>
                                <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                                <p>Phone: {order.address.phone}</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
