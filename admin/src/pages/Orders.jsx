import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { FiChevronDown, FiChevronUp, FiPackage, FiCalendar, FiFilter } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import Sidebar from '../component/Sidebar';
import Nav from '../component/Nav';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// A simple, reusable loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
);

// --- NEW: Reusable component for filtered statistic cards ---
const FilteredStatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border-l-4 ${color}`}>
        <div className="text-2xl">{icon}</div>
        <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p key={value} className="text-xl font-bold text-gray-800 animate-[pulse_0.5s_ease-in-out]">
                {value}
            </p>
        </div>
    </div>
);


const Orders = () => {
    const { serverUrl } = useContext(authDataContext);
    const [allOrders, setAllOrders] = useState([]); // Store all orders fetched from server
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    
    // --- NEW: State for date filtering ---
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/order/all`, { withCredentials: true });
                if (res.data.success) {
                    const sortedOrders = res.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setAllOrders(sortedOrders);
                }
            } catch (err) {
                console.error("Order fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [serverUrl]);

    // --- NEW: Filter orders based on the selected date range ---
    const filteredOrders = useMemo(() => {
        if (!startDate || !endDate) {
            return allOrders; // If no date range is selected, show all orders
        }
        // Set endDate to the end of the day for inclusive filtering
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);

        return allOrders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= startDate && orderDate <= endOfDay;
        });
    }, [allOrders, startDate, endDate]);

    // --- NEW: Calculate stats for the filtered orders ---
    const filteredStats = useMemo(() => {
        const revenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
        const count = filteredOrders.length;
        return { revenue, count };
    }, [filteredOrders]);


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
                // Update the original list of all orders
                setAllOrders(allOrders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            }
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    const clearFilters = () => {
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen">
            {/* Add custom CSS for the date picker */}
            <style>{`
                .react-datepicker-wrapper { width: 100%; }
                .react-datepicker__input-container input {
                    width: 100%;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    border: 1px solid #d1d5db;
                }
            `}</style>
            <Nav />
            <div className="flex h-screen pt-[70px]">
                <div className="w-64 flex-shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                             <h1 className="text-2xl md:text-3xl font-bold text-[#4A2E2A]">All Orders</h1>
                        </div>

                        {/* --- NEW: Date Filter and Stats Section --- */}
                        <div className="bg-gray-50 p-4 rounded-xl border mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date Range</label>
                                    <div className="flex items-center gap-2">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Date"
                                            className="w-full"
                                        />
                                        <span className="text-gray-500">-</span>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            placeholderText="End Date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <FilteredStatCard 
                                    icon={<FaRupeeSign className="text-green-500" />}
                                    title="Filtered Revenue"
                                    value={`₹${filteredStats.revenue.toLocaleString('en-IN')}`}
                                    color="border-green-500"
                                />
                                <FilteredStatCard 
                                    icon={<FiPackage className="text-blue-500" />}
                                    title="Filtered Orders"
                                    value={filteredStats.count}
                                    color="border-blue-500"
                                />
                            </div>
                             {(startDate || endDate) && (
                                <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline mt-2">Clear Filters</button>
                            )}
                        </div>


                        {loading ? (
                            <LoadingSpinner />
                        ) : filteredOrders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* Table Head (Unchanged) */}
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
                                    {/* Table Body now uses filteredOrders */}
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredOrders.map(order => (
                                            <React.Fragment key={order._id}>
                                                <tr className="hover:bg-gray-50 transition-colors duration-200">
                                                    {/* Table Row Content (Unchanged) */}
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
                                                        {/* Expanded Row Content (Unchanged) */}
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
                                                                    <p className="mt-2"><strong>Payment:</strong> {order.paymentMethod === 'COD' ? "Cash on Delivery" : "Paid Online"}</p>
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
                                <p className="text-gray-500 mt-1">{startDate && endDate ? "No orders were found in the selected date range." : "When new orders are placed, they will appear here."}</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Orders;
