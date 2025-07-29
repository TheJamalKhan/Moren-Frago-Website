import React, { useState, useEffect, useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHash, FiCalendar, FiCreditCard, FiMapPin, FiCheck } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

// --- STATUS BAR COMPONENT (Unchanged) ---
const StatusBar = ({ status }) => {
    const stages = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentStatusIndex = stages.indexOf(status);

    const stageStyles = [
        { bg: 'bg-yellow-400', pulseColor: 'rgba(250, 204, 21, 0.7)' },
        { bg: 'bg-lime-500', pulseColor: 'rgba(132, 204, 22, 0.7)' },
        { bg: 'bg-teal-500', pulseColor: 'rgba(20, 184, 166, 0.7)' },
        { bg: 'bg-green-500', pulseColor: 'rgba(34, 197, 94, 0.7)' }
    ];

    const styles = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 var(--pulse-color-start); }
            50% { transform: scale(1.05); box-shadow: 0 0 12px 12px var(--pulse-color-end); }
        }
        .glowing-pulse { animation: pulse 2s infinite; }
    `;

    return (
        <div className="w-full pt-4 pb-2">
            <style>{styles}</style>
            <div className="flex items-center justify-between">
                {stages.map((stage, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const circleColor = (isCompleted || isCurrent) ? stageStyles[index].bg : 'bg-gray-300';
                    const lineColor = isCompleted ? stageStyles[index + 1]?.bg || 'bg-green-500' : 'bg-gray-300';
                    const pulseStyle = isCurrent ? { '--pulse-color-start': stageStyles[index].pulseColor, '--pulse-color-end': stageStyles[index].pulseColor.replace('0.7', '0') } : {};

                    return (
                        <React.Fragment key={stage}>
                            <div className="flex flex-col items-center text-center w-20">
                                <div style={pulseStyle} className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-500 ${circleColor} ${isCurrent ? 'glowing-pulse' : ''}`}>
                                    {isCompleted || (isCurrent && stage === 'Delivered') ? <FiCheck size={16} /> : <span>{index + 1}</span>}
                                </div>
                                <p className={`mt-2 text-xs font-semibold transition-colors duration-500 ${isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-400'}`}>{stage}</p>
                            </div>
                            {index < stages.length - 1 && <div className={`flex-1 h-1 mx-2 transition-all duration-1000 ease-in-out ${lineColor}`}></div>}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

// --- DELIVERED MESSAGE COMPONENT (Unchanged) ---
const DeliveredMessage = () => {
    const styles = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-message {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `;
    return (
        <>
            <style>{styles}</style>
            <div className="my-4 p-4 bg-gray-800 border border-yellow-400 rounded-lg text-center fade-in-message">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    Now You are the Real MFs 💀🔥
                </h2>
                <p className="text-yellow-400 text-sm mt-1 font-semibold">(Moren Fragonian)</p>
            </div>
        </>
    );
};


const Order = () => {
    const { serverUrl } = useContext(authDataContext);
    const { userData } = useContext(userDataContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const animationStyles = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up-item {
            opacity: 0;
            animation: fadeInUp 0.5s ease-out forwards;
        }
    `;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
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

        if (userData) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [serverUrl, userData]);

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen pt-24 md:pt-28 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <style>{animationStyles}</style>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4A2E2A] mb-8 tracking-wide">My Orders</h1>

                <div className="bg-transparent p-0 md:p-6 rounded-xl">
                    {loading ? (
                        <p className="text-center text-gray-500 text-lg">Loading your orders...</p>
                    ) : orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div 
                                    key={order._id} 
                                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden fade-in-up-item"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="p-4 sm:p-6">
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
                                        </div>

                                        <StatusBar status={order.status} />

                                        {order.status === 'Delivered' && <DeliveredMessage />}

                                        <div className="mb-4 pt-4 border-t border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Items</h3>
                                            <div className="space-y-3">
                                                {order.items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="flex items-center gap-4">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name || 'Product'}
                                                            className="w-14 h-14 object-cover rounded-md bg-gray-200"
                                                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/56x56/F3D9C8/4A2E2A?text=Img"; }}
                                                        />
                                                        <div className="flex-grow">
                                                            <p className="font-semibold text-gray-700">{item.name || 'Product Name'}</p>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity || 1} | Size: {item.size || 'N/A'}</p>
                                                        </div>
                                                        <p className="font-semibold text-gray-800">
                                                            ₹{item.price * item.quantity}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base text-gray-700">
                                                <div className="flex items-center gap-3">
                                                    <FaRupeeSign className="w-5 h-5 text-[#4A2E2A]"/>
                                                    <p><span className="font-semibold">Total Amount:</span> ₹{order.amount.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <FiCreditCard className="w-5 h-5 text-[#4A2E2A]"/>
                                                    {/* --- FIX: Correctly display the payment method --- */}
                                                    <p><span className="font-semibold">Payment:</span> {order.paymentMethod === 'COD' ? "Cash on Delivery" : "Paid Online"}</p>
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
