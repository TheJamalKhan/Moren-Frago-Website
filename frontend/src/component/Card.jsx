// Card.jsx
import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

function Card({ name, image, id, price, mrp, discountPercentage }) {
    let { currency } = useContext(shopDataContext);
    let navigate = useNavigate();

    const calculatedDiscount = (mrp && price < mrp)
        ? ((mrp - price) / mrp) * 100
        : 0;

    const displayDiscount = discountPercentage > 0 ? discountPercentage : calculatedDiscount;


    return (
        <div
            // REMOVED: md:w-64 - now w-full ensures it fills its grid cell
            className='relative w-full min-h-[320px] md:min-h-[380px] bg-[#efd6c6] rounded-lg flex flex-col items-center p-[10px] cursor-pointer border-[1px] border-[#e4cfc7] overflow-hidden group transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md'
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            {/* Shine Reflection on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12 scale-x-0 group-hover:scale-x-100 group-hover:translate-x-full" style={{ left: '-100%' }}></div>

            {/* Image Container: Aspect ratio maintained, slight mb-2 for separation */}
            <div className="w-full relative pt-[100%] rounded-sm overflow-hidden mb-2">
                <img
                    src={image}
                    alt={name}
                    className='absolute top-0 left-0 w-full h-full object-cover'
                />
            </div>

            {/* Content Area: Consistent padding for text details */}
            <div className='flex flex-col w-full px-[2px] pt-[5px] pb-[5px]'>
                {/* Product Name: Maroon color, responsive text size, line clamp */}
                <div className='text-[#800000] text-sm md:text-[18px] font-semibold overflow-hidden text-ellipsis line-clamp-2 mb-1'>
                    {name}
                </div>

                {/* Price, MRP, and Discount Percentage Block */}
                <div className='flex flex-col items-start'>
                    <div className='flex items-baseline mb-1'>
                        <div className='text-black text-[14px] font-bold mr-2'>{currency} {price}</div>

                        {mrp && mrp > price && (
                            <div className='text-[#808080] text-[12px] line-through'>
                                {currency} {mrp}
                            </div>
                        )}
                    </div>

                    {/* Discount Percentage */}
                    {displayDiscount > 0 && (
                        <div className='text-[#66bb6a] text-[12px] font-medium'>
                            {Math.round(displayDiscount)}% Off
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;