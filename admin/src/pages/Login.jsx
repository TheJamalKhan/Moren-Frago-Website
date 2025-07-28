import React from 'react'
import logo from '../assets/logo.png'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react'
import { useContext } from 'react';
import axios from 'axios';
import {authDataContext} from '../context/AuthContext.jsx'
import { adminDataContext } from '../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {serverUrl} = useContext(authDataContext);
  const {adminData, getAdmin} = useContext(adminDataContext)
  const navigate = useNavigate()
  const AdminLogin = async (e) => {
        e.preventDefault();
        try {
         const result = await axios.post(serverUrl + '/api/auth/adminlogin',{ email, password },{withCredentials: true })
        console.log(result.data)
        getAdmin()
        navigate("/")
        } catch (error) {
        console.log(error)
        }
  }  
  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3dc] flex items-center justify-center font-sans'>
          {/* Header */}
          <div
            className='absolute top-0 left-0 w-full h-[80px] flex items-center justify-start px-6 gap-3 cursor-pointer'>
            <img className='w-10' src={logo} alt='Moren Frago Logo' />
            <h1 className='text-xl font-bold text-[#5a4a42]'>Moren Frago</h1>
          </div>
    
          {/* Form Container */}
          <div className='w-[90%] max-w-[400px] bg-[#fff8f5]/80 border border-[#e4cfc7] backdrop-blur-md rounded-2xl shadow-[0_8px_24px_0_rgba(160,130,110,0.1)] px-6 py-8'>
            {/* Title */}
            <div className='mb-6 text-center'>
              <h2 className='text-2xl font-semibold text-[#5a4038]'>Login Page</h2>
              <p className='text-sm text-[#8c746b]'>Welcome to Moren Frago Admin Login</p>
            </div>
    
            <form onSubmit={AdminLogin} className='flex flex-col gap-5'>
    
              {/* Email Input */}
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full h-[45px] px-4 rounded-md border border-[#e0c7c0] bg-[#fffaf8] shadow-inner placeholder-[#b89f94] text-[#4e3d36] focus:outline-none focus:ring-2 focus:ring-[#eacfc2] text-sm'
              />
    
              {/* Password Input */}
              <div className='relative w-full h-[45px]'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full h-full px-4 pr-10 rounded-md border border-[#e0c7c0] bg-[#fffaf8] shadow-inner placeholder-[#b89f94] text-[#4e3d36] focus:outline-none focus:ring-2 focus:ring-[#eacfc2] text-sm'
                />
                {showPassword ? (
                  <IoEye
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a88f84] cursor-pointer'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <IoEyeOff
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a88f84] cursor-pointer'
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
    
              {/* Submit Button */}
              <button
                type='submit'
                className='w-[180px] mx-auto h-[45px] bg-gradient-to-r from-[#f3d9c8] to-[#e8cbb3] text-[#5a4038] font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-sm'
              >
                Login
              </button>
    
              
            </form>
          </div>
        </div>
  )
}

export default Login
