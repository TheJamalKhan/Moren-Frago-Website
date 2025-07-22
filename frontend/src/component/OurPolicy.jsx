import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";

function OurPolicy() {
  return (
    // Main container: full width, responsive vertical padding, subtle gradient background
    // min-h-screen has been removed to prevent excessive spacing with subsequent sections
    <div className='w-full flex flex-col items-center bg-[#e8cbb3] py-16 md:py-20 lg:py-24'>

      {/* Title Section */}
      <div className='w-full text-center px-4 mb-12 md:mb-16'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='max-w-3xl mx-auto text-base md:text-xl px-4 text-[#800000] font-medium mt-4'>
          Customer Friendly Policies - Committed To Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards Container: Responsive Grid - Now with 4 columns on large screens */}
      <div className='w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 px-4'>

        {/* Policy Card 1: Quick & Simple Exchanges */}
        <div className='flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform'>
          <RiExchangeFundsLine className='text-5xl md:text-6xl text-[#d97706] mb-4' />
          <p className='font-bold text-xl md:text-2xl text-gray-800 mb-2'>Quick & Simple Exchanges</p>
          <p className='text-sm md:text-base text-gray-600'>Exchange Made Easy: A quick, simple, and customer-friendly process.</p>
        </div>

        {/* Policy Card 2: 7 Days Return Policy */}
        <div className='flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform'>
          <TbRosetteDiscountFilled className='text-5xl md:text-6xl text-[#d97706] mb-4' />
          <p className='font-bold text-xl md:text-2xl text-gray-800 mb-2'>7 Days Return Policy</p>
          <p className='text-sm md:text-base text-gray-600'>Shop With Confidence: Enjoy our 7-day easy return guarantee.</p>
        </div>

        {/* Policy Card 3: Best Customer Support */}
        <div className='flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform'>
          <BiSupport className='text-5xl md:text-6xl text-[#d97706] mb-4' />
          <p className='font-bold text-xl md:text-2xl text-gray-800 mb-2'>Best Customer Support</p>
          <p className='text-sm md:text-base text-gray-600'>Trusted Customer Support: Your satisfaction is our top priority.</p>
        </div>

        {/* Policy Card 4: Assured Quality Products */}
        <div className='flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform'>
          <BsPatchCheckFill className='text-5xl md:text-6xl text-[#d97706] mb-4' />
          <p className='font-bold text-xl md:text-2xl text-gray-800 mb-2'>Assured Quality Products</p>
          <p className='text-sm md:text-base text-gray-600'>Every item is handpicked and rigorously inspected to meet our high standards.</p>
        </div>

      </div>
    </div>
  );
}

export default OurPolicy;