import React, { useState, useEffect, useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiCalendar, FiCreditCard, FiMapPin, FiShoppingCart, FiHash } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

const Order = () => {
    const { serverUrl } = useContext(authDataContext);
    const { userData } = useContext(userDataContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userData) return;
            try {
                const response = await axios.get(`${serverUrl}/api/order/userorders`, { withCredentials: true });
                if (response.data.success) {
                    const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [serverUrl, userData]);

    const getStatusChipStyle = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Processing':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen pt-24 md:pt-28 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4A2E2A] mb-8 tracking-wide">My Orders</h1>
                
                {/* --- ADDED LINE --- */}
                <p className="text-lg sm:text-xl text-center text-[#6d4c41] -mt-6 mb-12 font-light tracking-wide">Welcome, Moren Fragonian.</p>
                {/* --- END OF ADDED LINE --- */}

                <div className="bg-transparent p-0 md:p-6 rounded-xl">
                    {loading ? (
                        <p className="text-center text-gray-500 text-lg">Loading your orders...</p>
                    ) : orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-4 sm:p-6">
                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 mb-4">
                                            <div>
                                                <p className="font-bold text-base sm:text-lg text-gray-800 flex items-center gap-2">
                                                    <FiHash className="text-[#4A2E2A]" />
                                                    Order ID: #{order._id.slice(-6)}
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                    <FiCalendar className="text-gray-400" /> 
                                                    {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <span className={`mt-3 sm:mt-0 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full flex items-center gap-1.5 ${getStatusChipStyle(order.status)}`}>
                                                <FiPackage />
                                                {order.status}
                                            </span>
                                        </div>

                                        {/* Display items directly */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Items</h3>
                                            <div className="space-y-3">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-4">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name || 'Product'} 
                                                            className="w-14 h-14 object-cover rounded-md bg-gray-200"
                                                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/56x56/F3D9C8/4A2E2A?text=Img"; }}
                                                        />
                                                        <div className="flex-grow">
                                                            <p className="font-semibold text-gray-700">{item.name || 'Product Name'}</p>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity || 0}</p>
                                                        </div>
                                                        <p className="font-semibold text-gray-800">
                                                            ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString('en-IN')}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Order Summary Details */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base text-gray-700">
                                                <div className="flex items-center gap-3">
                                                    <FaRupeeSign className="w-5 h-5 text-[#4A2E2A]"/>
                                                    <p><span className="font-semibold">Total Amount:</span> ₹{order.amount.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <FiCreditCard className="w-5 h-5 text-[#4A2E2A]"/>
                                                    <p><span className="font-semibold">Payment:</span> {order.payment ? "Paid" : "Cash on Delivery"}</p>
                                                </div>
                                                <div className="md:col-span-2 flex items-start gap-3 mt-2">
                                                    <FiMapPin className="w-5 h-5 text-[#4A2E2A] mt-1 flex-shrink-0"/>
                                                    <p><span className="font-semibold">Address:</span> {`${order.address.address}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-md">
                            <FiShoppingCart className="mx-auto text-6xl sm:text-7xl text-gray-300 mb-4" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">No Orders Yet</h2>
                            <p className="text-gray-500 mt-2 mb-6">You haven't placed any orders with us. Let's change that!</p>
                            <button onClick={() => navigate('/collection')} className="mt-6 bg-[#4A2E2A] text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-[#6d4c41] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;