import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

function Card({ name, image1, image3, id, price, mrp, discountPercentage }) {
    const { currency } = useContext(shopDataContext);
    const navigate = useNavigate();

    // Calculate discount if not provided
    const calculatedDiscount = (mrp && price < mrp) ? ((mrp - price) / mrp) * 100 : 0;
    const displayDiscount = discountPercentage > 0 ? discountPercentage : calculatedDiscount;

    return (
        <div
            // REMOVED fixed min-height classes to allow the card to resize based on content.
            // This fixes the large gap on mobile devices.
            className="relative w-full bg-[#3b3131ee] rounded-xl flex flex-col items-center p-3 cursor-pointer border border-gray-800 group transition-all duration-700 hover:scale-[1.02] hover:-rotate-1 hover:shadow-2xl hover:border-white hover:shadow-gray-800/50 shadow-lg shadow-gray-900/50 overflow-visible z-0 origin-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate(`/productdetail/${id}`);
            }}
        >
            {/* Google Font Inline */}
            <link
                href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap"
                rel="stylesheet"
            />

            {/* Shine Effect (Slower Duration) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl z-0">
                <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -skew-x-20 scale-150 -translate-x-full group-hover:translate-x-full" />
            </div>

            {/* Image Section */}
            <div className="relative w-full pt-[100%] z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full transition-all duration-500 ease-in-out origin-center z-10 group-hover:-translate-y-2 group-hover:rotate-2">
                    <div className="relative w-full h-full rounded-xl">
                        {/* Default Image */}
                        <img
                            src={image1}
                            alt={name}
                            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 group-hover:opacity-0"
                        />
                        {/* Hover Image */}
                        <img
                            src={image3}
                            alt={name}
                            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Discount Tag */}
                    {displayDiscount > 0 && (
                        <div className="absolute top-2 left-2 bg-[#00ab0031] text-black text-[10px] leading-none px-1.5 py-1 sm:text-xs sm:px-2 sm:py-[2px] rounded-md z-30 font-medium tracking-wide shadow-md">
                            {Math.round(displayDiscount)}% OFF
                        </div>
                    )}
                </div>
            </div>

            {/* Info Section - Reduced margin-top on mobile */}
            <div className="flex flex-col w-full px-1 z-20 mt-3 sm:mt-4">
                {/* Responsive font size for product name */}
                <h3 className="text-gray-300 group-hover:text-white text-sm md:text-base font-light leading-snug line-clamp-2 mb-2 transition-colors duration-300">
                    {name}
                </h3>

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-baseline gap-2">
                        {/* Responsive font size for price */}
                        <p className="text-white text-base md:text-lg font-medium">{currency}{price}</p>
                        {mrp && mrp > price && (
                            <p className="text-gray-400 text-sm line-through font-light">{currency}{mrp}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
