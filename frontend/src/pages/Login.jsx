import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Logo from '../assets/logo.png';
import google from '../assets/google.png';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { userDataContext} from '../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { toast } from 'react-toastify'; // Assuming toast is from react-toastify


function Login() {
  
  const { serverUrl } = useContext(authDataContext); // Corrected: Destructuring serverUrl
  const { getCurrentUser } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added: setLoading state
  const navigate = useNavigate();

  // Handle email/password login
  const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login',{
                email,password
            },{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
            
        } catch (error) {
            console.log(error)
            setLoading(false); // Ensure loading is set to false on error
            toast.error("User Login Failed")
        }
    }
     const handleGoogleLogin = async () => {
            try {
                const response = await signInWithPopup(auth , provider)
                let user = response.user
                let name = user.displayName;
                let email = user.email
    
                const result = await axios.post(serverUrl + "/api/auth/googlelogin" ,{name , email} , {withCredentials:true})
                console.log(result.data)
                getCurrentUser()
            navigate("/")
    
            } catch (error) {
                console.log(error)
            }
            
        }

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] flex items-center justify-center font-sans'>
      {/* Header */}
      <div
        className='absolute top-0 left-0 w-full h-[80px] flex items-center justify-start px-6 gap-3 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <img className='w-10' src={Logo} alt='Moren Frago Logo' />
        <h1 className='text-xl font-bold text-[#5a4a42]'>Moren Frago</h1>
      </div>

      {/* Form Container */}
      <div className='w-[90%] max-w-[400px] bg-[#fff8f5]/80 border border-[#e4cfc7] backdrop-blur-md rounded-2xl shadow-[0_8px_24px_0_rgba(160,130,110,0.1)] px-6 py-8'>
        {/* Title */}
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-semibold text-[#5a4038]'>Login Page</h2>
          <p className='text-sm text-[#8c746b]'>Welcome back to Moren Frago</p>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col gap-5'>
          {/* Google Sign-in */}
          <button
            type='button'
            className='w-full h-[45px] bg-[#fff5f0] border border-[#e0c7c0] rounded-md flex items-center justify-center gap-2 shadow hover:shadow-md transition-all duration-300 text-[#5a4038] font-medium text-sm'
            onClick={handleGoogleLogin}
          >
            <img src={google} alt='Google Logo' className='w-6' />
            Continue with Google
          </button>

          {/* Divider */}
          <div className='flex items-center justify-center gap-3 text-xs text-[#a88f84]'>
            <div className='w-[40%] h-px bg-[#e0c7c0]'></div>
            OR
            <div className='w-[40%] h-px bg-[#e0c7c0]'></div>
          </div>

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
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>

          {/* Registration Redirect */}
          <p className='text-center text-sm text-[#8c746b]'>
            Don't have an account?{' '}
            <span
              className='text-[#a67c6b] font-semibold cursor-pointer hover:underline'
              onClick={() => navigate('/signup')}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;