import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { MdDashboard } from "react-icons/md"; // Dashboard icon
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate();
    return (
        <div className='w-[18%] min-h-[100vh] border-r border-gray-300 py-12 fixed left-0 top-0 bg-[#f8e5d6] text-gray-800 shadow-md'>
            <div className='flex flex-col gap-3 pt-8 pl-[18%] pr-6 text-sm font-medium'>

                {/* Dashboard Option */}
                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/')}
                >
                    <MdDashboard className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>Dashboard</p>
                </div>

                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/add')}
                >
                    <IoIosAddCircleOutline className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>Add Items</p>
                </div>

                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/lists')}
                >
                    <FaRegListAlt className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>List Items</p>
                </div>

                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/orders')}
                >
                    <SiTicktick className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>View Orders</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
