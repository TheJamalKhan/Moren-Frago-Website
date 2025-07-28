import React, { useContext, useState, useEffect } from "react";
import logo from '../assets/logo.png';
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillSearchHeartFill, BsBoxSeam } from "react-icons/bs";
import { userDataContext } from "../context/UserContext";
import { AiOutlineHome } from "react-icons/ai";
import { BsCollection } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { FiMenu, FiX, FiHelpCircle } from "react-icons/fi"; // Hamburger, Close, and Help icons
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { shopDataContext } from "../context/ShopContext";

function Nav() {
    const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
    const { serverUrl } = useContext(authDataContext);
    const { showSearch, setShowSearch, search, setSearch, getCartCount, setIsCartOpen } = useContext(shopDataContext);
    const [showProfile, setShowProfile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile drawer
    const navigate = useNavigate();
    const location = useLocation();

    const [firstLetter, setFirstLetter] = useState('');

    useEffect(() => {
        if (userData && userData.name) {
            setFirstLetter(userData.name.slice(0, 1).toUpperCase());
        } else {
            setFirstLetter('');
        }
    }, [userData]);

    useEffect(() => {
        if (!userData) {
            getCurrentUser();
        }
    }, [getCurrentUser, userData]);

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            setUserData(null);
            navigate('/login');
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    // Helper to determine if a nav link is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className='w-full z-10 fixed top-0 left-0 right-0'>
            {/* Top Navbar */}
            <div className={`relative z-20 h-[70px] flex items-center justify-between px-4 md:px-[30px] shadow-md shadow-[#0f0a05] transition-colors duration-300 ease-in-out bg-[#f3d9c8b0] backdrop-blur-sm`}>
                
                {/* --- DESKTOP: Left side (Logo) --- */}
                <div className="hidden md:flex flex-1 justify-start">
                    <div className='cursor-pointer' onClick={() => navigate('/')}>
                        <img src={logo} alt="logo" className="w-[120px]" />
                    </div>
                </div>

                {/* --- DESKTOP: Center (Nav Links) --- */}
                <div className="hidden md:flex flex-1 justify-center">
                    <ul className='flex gap-6 text-gray-800 font-medium'>
                        <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/")}>Home</li>
                        <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/collection")}>Shop</li>
                        <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/about")}>About</li>
                        <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/contact")}>Contact</li>
                    </ul>
                </div>

                {/* --- MOBILE: Hamburger (Left) --- */}
                <div className="md:hidden w-1/4 flex justify-start">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-700 text-3xl">
                        <FiMenu />
                    </button>
                </div>

                {/* --- MOBILE: Logo (Center) --- */}
                <div className="md:hidden w-1/2 flex justify-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className="w-[100px]" />
                </div>

                {/* --- Right Icons (Aligned right on both mobile and desktop) --- */}
                <div className='w-1/4 md:flex-1 flex items-center justify-end gap-4 md:gap-6 text-gray-700 text-3xl'>
                    {!showSearch ? (
                        <IoSearchSharp className='cursor-pointer hover:text-[#d97706] transition duration-300' onClick={() => { setShowSearch(true); if (location.pathname !== "/collection") navigate("/collection"); }} />
                    ) : (
                        <BsFillSearchHeartFill className='cursor-pointer hover:text-[#d97706] transition duration-300' onClick={() => setShowSearch(false)} />
                    )}

                    <div className='relative'>
                        {!userData ? (
                            <FaRegUser className='w-[29px] h-[29px] hover:text-[#d97706] transition duration-300 cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
                        ) : (
                            <div className='w-[30px] h-[30px] bg-[#080808] text-[20px] text-[#e8cbb3] rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>
                                {firstLetter}
                            </div>
                        )}
                        <div className={`absolute w-[220px] bg-[#000000e6] backdrop-blur-sm top-[calc(100% + 10px)] right-0 border border-gray-700 rounded-[10px] z-30 transition-all duration-300 ease-in-out transform origin-top-right ${showProfile ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                            <ul className="text-white p-4 text-base font-sans">
                                {!userData ? (
                                    <>
                                        <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200" onClick={() => { navigate('/login'); setShowProfile(false); }}>Login</li>
                                        <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200" onClick={() => { navigate('/signup'); setShowProfile(false); }}>Sign Up</li>
                                    </>
                                ) : (
                                    <>
                                        <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200" onClick={() => { navigate('/order'); setShowProfile(false); }}>My Orders</li>
                                        <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200" onClick={() => { handleLogout(); setShowProfile(false); }}>Logout</li>
                                    </>
                                )}
                                <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200" onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
                            </ul>
                        </div>
                    </div>

                    <div className='relative hidden md:block transition-all duration-500 ease-in-out cursor-pointer' onClick={() => setIsCartOpen(true)}>
                        <AiOutlineShoppingCart className='hover:text-[#d97706] transition duration-300' />
                        {getCartCount > 0 && <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] top-[-6px] right-[-10px]'>{getCartCount}</p>}
                    </div>
                </div>
            </div>

            {/* Animated Search Bar */}
            <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${showSearch ? 'h-[80px]' : 'h-0'} bg-[#2d2d2d] flex items-center justify-center`}>
                <input type="text" className={`h-[60%] bg-[#5a5652] rounded-full text-white placeholder:text-white transition-all duration-300 ease-in-out ${showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] px-10 text-lg`} placeholder="Search Here" onChange={(e) => { setSearch(e.target.value) }} value={search} />
            </div>

            {/* --- MOBILE SIDE DRAWER MENU --- */}
            <div className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`relative w-72 h-full bg-[#191818] text-white p-6 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <img src={logo} alt="logo" className="w-[120px]" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-3xl"><FiX /></button>
                    </div>
                    <ul className="flex flex-col gap-4 text-lg">
                        <li className="flex items-center gap-4 py-3 px-4 hover:bg-[#333] rounded-lg cursor-pointer" onClick={() => { navigate('/collection'); setIsMobileMenuOpen(false); }}>
                            <BsCollection /> Collection
                        </li>
                        <li className="flex items-center gap-4 py-3 px-4 hover:bg-[#333] rounded-lg cursor-pointer" onClick={() => { navigate('/order'); setIsMobileMenuOpen(false); }}>
                            <BsBoxSeam /> My Orders
                        </li>
                        <li className="flex items-center gap-4 py-3 px-4 hover:bg-[#333] rounded-lg cursor-pointer" onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}>
                            <AiOutlineInfoCircle /> About
                        </li>
                        <li className="flex items-center gap-4 py-3 px-4 hover:bg-[#333] rounded-lg cursor-pointer" onClick={() => { navigate('/help'); setIsMobileMenuOpen(false); }}>
                            <FiHelpCircle /> Help Center
                        </li>
                        <li className="flex items-center gap-4 py-3 px-4 mt-auto hover:bg-[#333] rounded-lg cursor-pointer" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                            <FaSignOutAlt /> Logout
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- PROFESSIONAL MOBILE BOTTOM NAVIGATION (UPDATED) --- */}
            <div className='w-full h-[65px] pb-1 flex items-center justify-around px-2 fixed bottom-0 left-0 bg-black/80 backdrop-blur-lg border-t border-white/10 shadow-lg md:hidden'>
                <button className={`flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${isActive('/') ? 'text-[#d97706]' : 'text-gray-300 hover:text-white'}`} onClick={() => navigate("/")}>
                    <AiOutlineHome size={24} />
                    <span className="text-xs font-medium">Home</span>
                </button>
                <button className={`flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${isActive('/collection') ? 'text-[#d97706]' : 'text-gray-300 hover:text-white'}`} onClick={() => navigate("/collection")}>
                    <BsCollection size={24} />
                    <span className="text-xs font-medium">Shop</span>
                </button>
                <button className={`flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${isActive('/contact') ? 'text-[#d97706]' : 'text-gray-300 hover:text-white'}`} onClick={() => navigate("/contact")}>
                    <IoMdContacts size={24} />
                    <span className="text-xs font-medium">Contact</span>
                </button>
                <div className="relative">
                    <button className='flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-all duration-200 active:scale-95' onClick={() => setIsCartOpen(true)}>
                        <AiOutlineShoppingCart size={24} />
                        <span className="text-xs font-medium">Cart</span>
                    </button>
                    {getCartCount > 0 && <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px] top-[-5px] right-[-5px]'>{getCartCount}</p>}
                </div>
            </div>
        </div>
    );
}

export default Nav;
