import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { FiTrash2, FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';

// A simple, reusable loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
);

function Lists() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { serverUrl } = useContext(authDataContext);

    const fetchList = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/product/list`);
            if (result.data.success) {
                // Sort list by date, newest first
                const sortedList = result.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setList(sortedList);
            }
        } catch (error) {
            console.error("Failed to fetch product list:", error);
            toast.error("Could not fetch products.");
        } finally {
            setLoading(false);
        }
    };

    const removeList = async (id, productName) => {
        // Professional Feature: Add a confirmation before deleting
        if (window.confirm(`Are you sure you want to remove "${productName}"?`)) {
            try {
                const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
                if (result.data.success) {
                    toast.success(`"${productName}" removed successfully!`);
                    fetchList(); // Refresh the list after deletion
                } else {
                    toast.error("Failed to remove product.");
                }
            } catch (error) {
                console.error("Failed to remove product:", error);
                toast.error(error.response?.data?.message || "An error occurred.");
            }
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen">
            <Nav />
            <div className="flex h-screen pt-[70px]">
                <div className="w-64 flex-shrink-0 hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="w-full bg-[#e2b07e] backdrop-blur-lg rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#4A2E2A]">All Listed Products</h1>
                            <span className="text-sm font-medium text-gray-500">{list.length} Products</span>
                        </div>

                        {loading ? (
                            <LoadingSpinner />
                        ) : list.length > 0 ? (
                            <div className="space-y-4">
                                {list.map((item) => (
                                    <div key={item._id} className="bg-white/90 p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4 transition-shadow duration-200 hover:shadow-lg">
                                        <img 
                                            src={item.image1} 
                                            onError={(e) => { e.target.src = "https://placehold.co/100x100/F3D9C8/4A2E2A?text=Img" }}
                                            className='w-full md:w-24 h-32 md:h-24 object-cover rounded-lg' 
                                            alt={item.name} 
                                        />
                                        <div className='flex-1 text-center md:text-left'>
                                            <p className='font-bold text-lg text-gray-800'>{item.name}</p>
                                            <p className='text-sm text-gray-500'>{item.category} &gt; {item.subCategory}</p>
                                            
                                            <div className='mt-2 flex items-center justify-center md:justify-start gap-3'>
                                                <p className='font-semibold text-lg text-[#4A2E2A]'>₹{item.price}</p>
                                                {item.mrp > item.price && (
                                                    <p className='text-gray-400 line-through text-sm'>₹{item.mrp}</p>
                                                )}
                                                {item.discountPercentage > 0 && (
                                                    <p className='text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full'>{item.discountPercentage}% OFF</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='w-full md:w-auto mt-4 md:mt-0 flex justify-end'>
                                            <button 
                                                onClick={() => removeList(item._id, item.name)}
                                                className='flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors duration-200'
                                            >
                                                <FiTrash2 />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 py-10 flex flex-col items-center">
                                <FiPackage size={48} className="text-gray-400 mb-4" />
                                <h2 className="text-xl font-semibold">No Products Listed</h2>
                                <p className="text-gray-500 mt-1">Use the "Add Items" page to list new products.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Lists;
