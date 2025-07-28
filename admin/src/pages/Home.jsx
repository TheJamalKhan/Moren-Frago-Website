import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { FaRupeeSign, FaCheckCircle, FaHourglassHalf, FaUsers } from 'react-icons/fa';
import { FiCode, FiBriefcase } from 'react-icons/fi';

// A simple, reusable loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
);

// Reusable component for statistic cards with animation
const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white/90 p-6 rounded-2xl shadow-lg flex items-center gap-5 border-l-4 ${color}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            {/* The key prop makes React re-render the element on change, triggering a subtle animation */}
            <p key={value} className="text-2xl font-bold text-gray-800 animate-[pulse_0.5s_ease-in-out]">
                {value}
            </p>
        </div>
    </div>
);


function Home() {
    const [stats, setStats] = useState({ revenue: 0, pendingOrders: 0, deliveredOrders: 0, users: 0 });
    const [loading, setLoading] = useState(true);
    const { serverUrl } = useContext(authDataContext);
    const isInitialLoad = useRef(true); // Ref to track the first load

    // --- LIVE POLLING FOR DASHBOARD STATS ---
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/stats/summary`, { withCredentials: true });
                if (response.data.success) {
                    setStats(response.data.data);
                }
            } catch (error) {
                console.error("Silent: Failed to fetch dashboard stats.", error);
                // On subsequent polling failures, we just keep the old data instead of showing an error.
            } finally {
                // Only stop the main loading spinner on the very first fetch
                if (isInitialLoad.current) {
                    setLoading(false);
                    isInitialLoad.current = false;
                }
            }
        };

        fetchStats(); // Fetch immediately on load
        const intervalId = setInterval(fetchStats, 5000); // Re-fetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [serverUrl]);

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen">
            <Nav />
            {/* This is the correct layout structure that matches your other pages */}
            <div className="flex h-screen pt-[70px]">
                <div className="w-64 flex-shrink-0 hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-[#4A2E2A]">Dashboard</h1>
                            <p className="text-gray-600">Welcome back, Admin!</p>
                        </div>

                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard 
                                    icon={<FaRupeeSign className="text-green-500" />}
                                    title="Total Revenue"
                                    value={`₹${stats.revenue.toLocaleString('en-IN')}`}
                                    color="border-green-500"
                                />
                                <StatCard 
                                    icon={<FaHourglassHalf className="text-yellow-500" />}
                                    title="Pending Orders"
                                    value={stats.pendingOrders}
                                    color="border-yellow-500"
                                />
                                <StatCard 
                                    icon={<FaCheckCircle className="text-blue-500" />}
                                    title="Completed Orders"
                                    value={stats.deliveredOrders}
                                    color="border-blue-500"
                                />
                                <StatCard 
                                    icon={<FaUsers className="text-orange-500" />}
                                    title="Total Customers"
                                    value={stats.users}
                                    color="border-orange-500"
                                />
                            </div>
                        )}
                        
                        {/* Information Section */}
                        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* About the Developer Card */}
                            <div className="bg-[#fdf6f0] p-6 rounded-xl shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <FiCode className="text-3xl text-[#4A2E2A]" />
                                    <h2 className="text-xl font-bold text-gray-800">About the Developer</h2>
                                </div>
                                <p className="text-gray-600">
                                    The entire Moren Frago platform is the creation of <span className="font-bold text-[#4A2E2A]">Md. Jamal Ashraf Khan</span>, a dedicated full-stack developer with a passion for building robust and user-centric applications. Jamal single-handedly engineered the complete e-commerce solution—from the responsive frontend and dynamic user experience to the secure backend and this powerful admin panel. His expertise in modern web technologies and commitment to quality are the foundation of Moren Frago's digital presence.
                                </p>
                            </div>

                            {/* About Moren Frago Card */}
                            <div className="bg-[#fdf6f0] p-6 rounded-xl shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <FiBriefcase className="text-3xl text-[#4A2E2A]" />
                                    <h2 className="text-xl font-bold text-gray-800">About Moren Frago</h2>
                                </div>
                                <p className="text-gray-600">
                                    Moren Frago is a modern fashion brand dedicated to providing high-quality, stylish apparel. This panel allows for the management of products, orders, and customer interactions, ensuring a smooth and professional experience for both the administrators and the customers.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
