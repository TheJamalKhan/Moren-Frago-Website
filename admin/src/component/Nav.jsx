import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from "axios"
import {authDataContext} from '../context/AuthContext'
import {adminDataContext} from '../context/AdminContext'
function Nav() {
    const navigate = useNavigate()
    const {serverUrl} = useContext(authDataContext)
    const {getAdmin} = useContext(adminDataContext)
    
    const logout = async () =>  {
      try {
        const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
        console.log(result.data)
        getAdmin()
        navigate("login")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='w-[100vw] h-[70px]  z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black' style={{ backgroundColor: 'rgba(238, 204, 188, 0.8)' }} >
    <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=> navigate("/")}>
    <img src={logo} alt="logo" className='w-[30px]'/>
    <h1 className='text-[25px] text-[black] font-sans'>Moren Frago</h1>
    </div>
    <button
  className='
    text-[15px]
    py-[10px] px-[20px]
    rounded-2xl
    bg-[#000000ca] {/* Base background color */}
    text-white
    hover:bg-[#c4b080] {/* Changed hover background to match hover border color */}
    hover:text-black
    hover:border-[1px]
    
    transition-all duration-300 ease-in-out {/* Apply transition to all properties over 300ms */}
    cursor-pointer
  '
  onClick={logout}
>
  Logout
</button>
    </div>
  )
}

export default Nav