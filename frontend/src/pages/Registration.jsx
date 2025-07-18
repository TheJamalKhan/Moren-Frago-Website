import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Logo from '../assets/logo.png';
import google from '../assets/google.png';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { toast } from 'react-toastify'; // Assuming toast is from react-toastify

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added: setLoading state
  const { serverUrl } = useContext(authDataContext); // Corrected: Destructuring serverUrl
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/registration`, // Changed to /registration as per authRoutes.js
        { name, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("Registration Successful!");
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }
  const handleGoogleSignup = async () => {
      setLoading(true); // Set loading to true
      try {
        const res = await signInWithPopup(auth, provider);
        let user = res.user;
        let name = user.displayName;
        let email = user.email;

        const result = await axios.post(`${serverUrl}/api/auth/googlelogin`,{name, email}, { withCredentials: true });
        console.log(result.data);
        toast.success("Google Login Successful!");
        navigate('/'); // Navigate to home or dashboard after Google login
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Google registration failed.");
      } finally {
        setLoading(false); // Set loading to false
      }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] flex flex-col items-center justify-start font-sans'>
      {/* Header */}
      <div
        className='w-full h-[80px] flex items-center justify-start px-8 gap-3 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <img className='w-[40px]' src={Logo} alt='Moren Frago Logo' />
        <h1 className='text-[24px] font-bold text-[#5a4a42]'>Moren Frago</h1>
      </div>

      {/* Title */}
      <div className='w-full text-center mt-4 mb-6'>
        <h2 className='text-[26px] font-semibold text-[#6b554d]'>Create Your Account</h2>
        <p className='text-[15px] text-[#8c746b]'>Join Moren Frago and start your journey</p>
      </div>

      {/* Form Container */}
      <div className='relative max-w-[500px] w-[90%] bg-[#fff8f5]/80 border border-[#e4cfc7] backdrop-blur-md rounded-2xl shadow-[0_8px_24px_0_rgba(160,130,110,0.1)] p-8'>
        <form onSubmit={handleSignup} className='flex flex-col gap-6'>

          {/* Google Sign-in */}
          <button
            type='button'
            className='w-full h-[50px] bg-[#fff5f0] border border-[#e0c7c0] rounded-lg flex items-center justify-center gap-3 shadow hover:shadow-md transition-all duration-300 text-[#5a4038] font-medium text-sm' onClick={handleGoogleSignup}
            disabled={loading} // Disable button while loading
          >
            <img src={google} alt='Google Logo' className='w-[24px]' />
            Continue with Google
          </button>

          {/* Divider */}
          <div className='flex items-center justify-center gap-4 text-[#a88f84] text-sm'>
            <div className='flex-1 h-px bg-[#e0c7c0]'></div>
            OR
            <div className='flex-1 h-px bg-[#e0c7c0]'></div>
          </div>

          {/* Input Fields */}
          <input
            type='text'
            placeholder='Username'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full h-[50px] px-4 rounded-lg border border-[#e0c7c0] bg-[#fffaf8] shadow-inner placeholder-[#b89f94] text-[#4e3d36] focus:outline-none focus:ring-2 focus:ring-[#eacfc2]'
            disabled={loading} // Disable input while loading
          />
          <input
            type='email'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full h-[50px] px-4 rounded-lg border border-[#e0c7c0] bg-[#fffaf8] shadow-inner placeholder-[#b89f94] text-[#4e3d36] focus:outline-none focus:ring-2 focus:ring-[#eacfc2]'
            disabled={loading} // Disable input while loading
          />
          <div className='relative w-full'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-[50px] px-4 pr-10 rounded-lg border border-[#e0c7c0] bg-[#fffaf8] shadow-inner placeholder-[#b89f94] text-[#4e3d36] focus:outline-none focus:ring-2 focus:ring-[#eacfc2]'
              disabled={loading} // Disable input while loading
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
            className='w-full h-[50px] bg-gradient-to-r from-[#f3d9c8] to-[#e8cbb3] text-[#5a4038] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>

          {/* Login Redirect */}
          <p className='text-sm text-center text-[#8c746b]'>
            Already have an account?{' '}
            <span
              className='text-[#a67c6b] font-semibold hover:underline cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>

        {/* Reflection Effect */}
        <div className='absolute bottom-[-20px] left-0 w-full h-[20px] bg-gradient-to-t from-[#e8cbb3]/50 to-transparent rounded-b-2xl blur-sm opacity-50'></div>
      </div>
    </div>
  );
}

export default Registration;