import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import axios from "axios";
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { FaBars } from 'react-icons/fa';

function Nav() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-[70px] z-10 fixed top-0 flex items-center justify-between px-4 md:px-[30px] shadow-md shadow-black bg-[rgba(238,204,188,0.8)]'>
      {/* Hamburger Menu for Mobile */}
      <div className='md:hidden flex items-center'>
        <FaBars
          className='text-[24px] text-black cursor-pointer'
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      {/* Logo and Brand - Centered on Mobile */}
      <div className='flex-1 flex justify-center md:justify-start items-center cursor-pointer' onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className='w-[90px] md:w-[60px]' />

        <h1 className='text-[20px] md:text-[25px] text-black font-sans ml-2 hidden sm:inline'>Moren Frago</h1>
      </div>

      {/* Logout Button */}
      <div className='hidden md:flex'>
        <button
          className='text-[15px] py-[10px] px-[20px] rounded-2xl bg-[#000000ca] text-white hover:bg-[#c4b080] hover:text-black hover:border-[1px] transition-all duration-300 ease-in-out cursor-pointer'
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu (Optional - can be expanded further) */}
      {showMenu && (
        <div className='absolute top-[70px] left-0 w-full bg-[#f8e5d6] flex flex-col items-start px-6 py-4 md:hidden shadow-md z-50'>
          <button className='text-[16px] py-2 text-black w-full text-left' onClick={() => navigate('/add')}>Add Items</button>
          <button className='text-[16px] py-2 text-black w-full text-left' onClick={() => navigate('/lists')}>List Items</button>
          <button className='text-[16px] py-2 text-black w-full text-left' onClick={() => navigate('/orders')}>View Orders</button>
          <button className='text-[16px] py-2 text-black w-full text-left' onClick={() => navigate('/')}>Dashboard</button>
          <button className='text-[16px] py-2 text-black w-full text-left' onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Nav;
