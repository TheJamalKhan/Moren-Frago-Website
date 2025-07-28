import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { FiChevronDown, FiChevronUp, FiPackage } from 'react-icons/fi';
import Sidebar from '../component/Sidebar';
import Nav from '../component/Nav';

// A simple, reusable loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
);

const Orders = () => {
    const { serverUrl } = useContext(authDataContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/order/all`, { withCredentials: true });
                if (res.data.success) {
                    const sortedOrders = res.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setOrders(sortedOrders);
                }
            } catch (err) {
                console.error("Order fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [serverUrl]);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    const getStatusChipStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Out for Delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Processing': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await axios.put(`${serverUrl}/api/order/status/${orderId}`, { status: newStatus }, { withCredentials: true });
            if (res.data.success) {
                setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            }
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen">
            <Nav />
            {/* Main container for content below the Nav */}
            {/* pt-[70px] pushes the content down by the height of the Nav */}
            <div className="flex h-screen pt-[70px]">
                {/* Sidebar with a fixed width, hidden on mobile */}
                <div className="w-64 flex-shrink-0 hidden md:block">
                    <Sidebar />
                </div>

                {/* Main scrollable content area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                             <h1 className="text-2xl md:text-3xl font-bold text-[#4A2E2A]">All Orders</h1>
                             <span className="text-sm font-medium text-gray-500">{orders.length} Orders</span>
                        </div>

                        {loading ? (
                            <LoadingSpinner />
                        ) : orders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50/80">
                                        <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <th className="px-4 py-3 text-left">Order ID</th>
                                            <th className="px-4 py-3 text-left">Date</th>
                                            <th className="px-4 py-3 text-left">Customer</th>
                                            <th className="px-4 py-3 text-left">Amount</th>
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-center">Items</th>
                                            <th className="px-4 py-3 text-right">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map(order => (
                                            <React.Fragment key={order._id}>
                                                <tr className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-gray-700">#{order._id.slice(-6)}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="font-medium text-sm text-gray-900">{order.userId?.name || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500">{order.userId?.email || ''}</p>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-sm text-gray-900">₹{order.amount.toLocaleString('en-IN')}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                         <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                            className={`text-xs font-semibold p-2 rounded-lg ${getStatusChipStyle(order.status)} border focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 appearance-none`}
                                                        >
                                                            <option value="Processing">Processing</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Out for Delivery">Out for Delivery</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">{order.items.length}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-right">
                                                        <button onClick={() => toggleExpand(order._id)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                                                            {expanded === order._id ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                                                        </button>
                                                    </td>
                                                </tr>
                                                {expanded === order._id && (
                                                    <tr className="bg-gray-100/70">
                                                        <td colSpan="7" className="p-4">
                                                            <div className="grid md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-700 mb-2">Products</h3>
                                                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                                                        {order.items.map((item, index) => (
                                                                            <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.name}
                                                                                    onError={(e) => { e.target.src = "https://placehold.co/64x64/F3D9C8/4A2E2A?text=Img" }}
                                                                                    className="w-16 h-16 object-cover rounded-md"
                                                                                />
                                                                                <div className='text-sm'>
                                                                                    <p className="font-medium text-gray-800">{item.name}</p>
                                                                                    <p className="text-gray-500">Qty: {item.quantity} | Size: {item.size || 'N/A'}</p>
                                                                                    <p className="font-semibold text-gray-800">₹{(item.quantity * item.price).toLocaleString('en-IN')}</p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-sm text-sm">
                                                                    <h3 className="font-semibold text-gray-700 mb-2">Shipping Info</h3>
                                                                    <p><strong>Name:</strong> {order.userId?.name || 'N/A'}</p>
                                                                    <p><strong>Email:</strong> {order.userId?.email || 'N/A'}</p>
                                                                    <p><strong>Phone:</strong> {order.address?.phone || 'N/A'}</p>
                                                                    <p className='mt-2'><strong>Address:</strong><br />
                                                                        {order.address?.address},<br />
                                                                        {order.address?.city}, {order.address?.state} - {order.address?.pincode}
                                                                    </p>
                                                                    <p className="mt-2"><strong>Payment:</strong> {order.payment ? "Paid Online" : "Cash on Delivery"}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 py-10 flex flex-col items-center">
                                <FiPackage size={48} className="text-gray-400 mb-4" />
                                <h2 className="text-xl font-semibold">No Orders Found</h2>
                                <p className="text-gray-500 mt-1">When new orders are placed, they will appear here.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Orders;
