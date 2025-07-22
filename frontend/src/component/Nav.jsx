import React, { useContext, useState, useEffect } from "react";
import logo from '../assets/logo.png';
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { userDataContext } from "../context/UserContext";
import { AiOutlineHome } from "react-icons/ai";
import { BsCollection } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { shopDataContext } from "../context/ShopContext";

function Nav() {
  const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const {showSearch, setShowSearch, search , setSearch} = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const [firstLetter, setFirstLetter] = useState('');
  const [scrolled, setScrolled] = useState(false); 

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

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <div className='w-full z-10 fixed top-0 left-0 right-0'>
      {/* Top Navbar */}
      <div className={`h-[70px] flex items-center justify-between px-[30px] shadow-md shadow-[#0f0a05] transition-colors duration-300 ease-in-out
          bg-[#f3d9c8b0] backdrop-blur-sm 
        `}
      >
        {/* Logo */}
        <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="w-[120px]" />
          <h1 className='text-[25px] text-[black] font-sans'></h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className='text-gray-800 font-medium transition-all duration-500 ease-in-out hidden md:flex'>
          <ul className='flex gap-6'>
            <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/")}>Home</li>
            <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/collection")}>Shop</li>
            <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/about")}>About</li>
            <li className='hover:text-[#d97706] cursor-pointer hover:underline underline-offset-4 transition duration-300' onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className='w-[30%] flex items-center justify-end gap-6 text-gray-700 text-3xl'>
          {/* Search Icon */}
          {!showSearch ? (
            <IoSearchSharp
              className='cursor-pointer hover:text-[#d97706] transition duration-300'
              onClick={() => {setShowSearch(true); navigate("/collection") }}
            />
          ) : (
            <BsFillSearchHeartFill
              className='cursor-pointer hover:text-[#d97706] transition duration-300'
              onClick={() => setShowSearch(false)}
            />
          )}

          {/* User Profile Icon */}
          <div className='relative'>
            {!userData ? (
              <FaRegUser
                className='w-[29px] h-[29px] hover:text-[#d97706] transition duration-300 cursor-pointer'
                onClick={() => setShowProfile(prev => !prev)}
              />
            ) : (
              <div
                className='w-[30px] h-[30px] bg-[#080808] text-[20px] text-[#e8cbb3] rounded-full flex items-center justify-center cursor-pointer'
                onClick={() => setShowProfile(prev => !prev)}
              >
                {firstLetter}
              </div>
            )}

            {/* Profile Dropdown */}
            <div className={`absolute w-[220px] bg-[#000000d7] top-[calc(100% + 10px)] right-0 border border-[#aaa9a9] rounded-[10px] z-20
              transition-all duration-300 ease-in-out transform origin-top-right
              ${showProfile ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
            `}>
              <ul className="text-white p-4 text-base font-sans">
                {!userData && (
                  <>
                    <li
                      className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200"
                      onClick={() => {
                        navigate('/login');
                        setShowProfile(false);
                      }}
                    >
                      Login
                    </li>
                    <li
                      className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200"
                      onClick={() => {
                        navigate('/signup');
                        setShowProfile(false);
                      }}
                    >
                      Sign Up
                    </li>
                  </>
                )}
                {userData && (
                  <>
                    <li
                      className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200"
                      onClick={() => {
                        handleLogout();
                        setShowProfile(false);
                      }}
                    >
                      Logout
                    </li>
                  </>
                )}
                <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200">Order</li>
                <li className="py-2 px-3 hover:bg-[#333] cursor-pointer rounded-md transition-colors duration-200" onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
              </ul>
            </div>
          </div>

          {/* Shopping Cart (hidden on small screens) */}
          <div className='relative hidden md:block transition-all duration-500 ease-in-out'>
            <AiOutlineShoppingCart className='cursor-pointer hover:text-[#d97706] transition duration-300' />
            <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] top-[-6px] right-[-10px]'>
              10
            </p>
          </div>
        </div>
      </div>

      {/* Animated Search Bar */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
          showSearch ? 'h-[80px]' : 'h-0'
        } bg-[#2d2d2d] flex items-center justify-center`}
      >
        <input
          type="text"
          className={`
            h-[60%] bg-[#5a5652] rounded-full text-white placeholder:text-white
            transition-all duration-300 ease-in-out
            ${showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}

            w-[85%]
            sm:w-[70%]
            md:w-[60%]
            lg:w-[50%]
            xl:w-[40%]
            2xl:w-[35%]

            px-4 sm:px-6 md:px-10 lg:px-12 xl:px-14
            text-sm sm:text-base md:text-lg lg:text-xl
          `}
          placeholder="Search Here" onChange={(e)=>{setSearch(e.target.value)}} value = {search}
        />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/")}>
          <AiOutlineHome className='w-[25px] h-[25px] text-[white] md:hidden' />
          Home
        </button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/collection")}>
          <BsCollection className='w-[25px] h-[25px] text-[white] md:hidden' />
          Shop
        </button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/contact")}>
          <IoMdContacts className='w-[25px] h-[25px] text-[white] md:hidden' />
          Contact
        </button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]'>
          <AiOutlineShoppingCart className='w-[25px] h-[25px] text-[white] md:hidden' />
          Cart
        </button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>10</p>
      </div>
    </div>
  );
}

export default Nav;