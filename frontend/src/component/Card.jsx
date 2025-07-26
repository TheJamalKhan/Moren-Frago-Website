// Card.jsx
import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

// The component now accepts image1 and image3
function Card({ name, image1, image3, id, price, mrp, discountPercentage }) {
    let { currency } = useContext(shopDataContext);
    let navigate = useNavigate();

    const calculatedDiscount = (mrp && price < mrp)
        ? ((mrp - price) / mrp) * 100
        : 0;

    const displayDiscount = discountPercentage > 0 ? discountPercentage : calculatedDiscount;

    return (
        <div
            className='relative w-full min-h-[320px] md:min-h-[380px] bg-[#efd6c6] rounded-lg flex flex-col items-center p-[10px] cursor-pointer border-[1px] border-[#e4cfc7] overflow-hidden group transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            {/* Shine Reflection on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12 scale-x-0 group-hover:scale-x-100 group-hover:translate-x-full" style={{ left: '-100%' }}></div>

            {/* --- Image Container: Now holds two images stacked on top of each other --- */}
            <div className="w-full relative pt-[100%] rounded-sm overflow-hidden mb-2 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.06)]">
                {/* Image 1 (Default Image) */}
                <img
                    src={image1}
                    alt={name}
                    className='absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out'
                />
                {/* Image 3 (Hover Image) */}
                {/* It's hidden by default (opacity-0) and appears when the 'group' is hovered */}
                <img
                    src={image3 || image1} // Fallback to image1 if image3 doesn't exist
                    alt={name}
                    className='absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'
                />
            </div>

            {/* Content Area */}
            <div className='flex flex-col w-full px-[2px] pt-[5px] pb-[5px]'>
                {/* Product Name */}
                <div className='text-[#383838] text-sm md:text-[18px] font-semibold overflow-hidden text-ellipsis line-clamp-2 mb-1'>
                    {name}
                </div>

                {/* Price, MRP, and Discount Percentage Block */}
                <div className='flex flex-col items-start'>
                    <div className='flex items-baseline mb-1'>
                        <div className='text-[#000000] text-[14px] font-bold mr-2'>{currency} {price}</div>

                        {mrp && mrp > price && (
                            <div className='text-[#808080] text-[12px] line-through'>
                                {currency} {mrp}
                            </div>
                        )}
                    </div>

                    {/* Discount Percentage */}
                    {displayDiscount > 0 && (
                        <div className='text-[#4b844e] text-[15px] font-medium'>
                            {Math.round(displayDiscount)}% Off
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;