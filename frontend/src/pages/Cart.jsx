import React, { useContext, useMemo } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Cart = () => {
    const {
        products,
        cartItem,
        updateQuantity,
        getCartCount,
        currency,
        delivery_fee
    } = useContext(shopDataContext);

    const navigate = useNavigate();

    // --- FIX: Updated calculations to handle tiered discounts ---
    const { totalMRP, subtotal, totalSavings, isFreeDelivery, amountNeeded, couponDiscount, nextDiscountTier } = useMemo(() => {
        let totalMRP = 0;
        let subtotal = 0;
        let couponDiscount = 0;
        let nextDiscountTier = { amount: 1999, discount: 200 };

        if (products.length > 0) {
            for (const [itemId, sizes] of Object.entries(cartItem)) {
                const itemInfo = products.find((product) => product._id === itemId);
                if (itemInfo) {
                    for (const quantity of Object.values(sizes)) {
                        subtotal += (itemInfo.price || 0) * quantity;
                        totalMRP += (itemInfo.mrp || itemInfo.price || 0) * quantity;
                    }
                }
            }
        }
        
        // Apply the best coupon discount
        if (subtotal >= 4999) {
            couponDiscount = 500;
            nextDiscountTier = null; // Highest tier reached
        } else if (subtotal >= 1999) {
            couponDiscount = 200;
            nextDiscountTier = { amount: 4999, discount: 500 };
        }

        const totalSavings = (totalMRP - subtotal) + couponDiscount;
        const isFreeDelivery = subtotal >= 1500;
        const amountNeeded = 1500 - subtotal;

        return { totalMRP, subtotal, totalSavings, isFreeDelivery, amountNeeded, couponDiscount, nextDiscountTier };
    }, [cartItem, products]);

    // Calculate the final total including all discounts
    const finalTotal = (isFreeDelivery ? subtotal : subtotal + delivery_fee) - couponDiscount;

    const progressPercentage = subtotal > 0 ? Math.min((subtotal / 1500) * 100, 100) : 0;

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen pt-24 md:pt-28 pb-28 md:pb-12 px-2 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4A2E2A] mb-8 tracking-wide">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md">
                            {getCartCount > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {Object.entries(cartItem).map(([itemId, sizes]) => {
                                        const itemInfo = products.find(p => p._id === itemId);
                                        if (!itemInfo) return null;

                                        return Object.entries(sizes).map(([size, quantity]) => {
                                            if (quantity <= 0) return null;
                                            
                                            let imageUrl = `https://placehold.co/100x120/F9F6F2/4A2E2A?text=No+Image`;
                                            if (itemInfo.image1) {
                                                imageUrl = itemInfo.image1;
                                            } else if (itemInfo.image && itemInfo.image.url) {
                                                imageUrl = itemInfo.image.url;
                                            } else if (itemInfo.images && itemInfo.images[0] && itemInfo.images[0].url) {
                                                imageUrl = itemInfo.images[0].url;
                                            }

                                            return (
                                                <div key={`${itemId}-${size}`} className="flex items-center gap-4 p-4">
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={itemInfo.name} 
                                                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg shadow-sm cursor-pointer flex-shrink-0"
                                                        onClick={() => navigate(`/productdetail/${itemInfo._id}`)}
                                                    />
                                                    <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                                                        <div>
                                                            <h2 
                                                                className="font-semibold text-gray-800 cursor-pointer hover:text-[#d97706] text-sm sm:text-base line-clamp-2"
                                                                onClick={() => navigate(`/productdetail/${itemInfo._id}`)}
                                                            >
                                                                {itemInfo.name}
                                                            </h2>
                                                            {itemInfo.category === 'Men' && (
                                                                <p className="text-xs sm:text-sm text-gray-500 mt-1">Size: {size}</p>
                                                            )}
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <p className="font-bold text-[#4A2E2A] text-sm sm:text-md">{currency}{itemInfo.price}</p>
                                                                <p className="text-xs sm:text-sm text-gray-500 line-through">{currency}{itemInfo.mrp}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <div className="flex items-center border border-gray-300 rounded-full">
                                                                <button onClick={() => updateQuantity(itemId, size, quantity - 1)} className="p-1 sm:p-2 text-gray-600 hover:text-black transition-colors">
                                                                    <FiMinus size={14} />
                                                                </button>
                                                                <span className="px-3 text-sm sm:text-md font-medium w-8 text-center">{quantity}</span>
                                                                <button onClick={() => updateQuantity(itemId, size, quantity + 1)} className="p-1 sm:p-2 text-gray-600 hover:text-black transition-colors">
                                                                    <FiPlus size={14} />
                                                                </button>
                                                            </div>
                                                            <button onClick={() => updateQuantity(itemId, size, 0)} className="text-red-500 hover:text-red-700 transition-colors p-1 sm:p-2">
                                                                <RiDeleteBin6Line size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        });
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-16 px-6">
                                    <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
                                    <p className="text-gray-500 mt-2">Explore our collections and find something you love.</p>
                                    <button onClick={() => navigate('/collection')} className="mt-8 bg-[#4A2E2A] text-white font-bold py-3 px-8 rounded-full hover:bg-[#6d4c41] transition-all duration-300 shadow-lg transform hover:scale-105">
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {getCartCount > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 lg:sticky lg:top-28">
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-4 mb-4">Order Summary</h2>
                                
                                {!isFreeDelivery && amountNeeded > 0 && (
                                    <div className="bg-orange-50 border border-orange-200 text-orange-800 p-3 rounded-lg mb-4 text-center text-sm animate-fade-in-down">
                                        <p>Add items worth <span className="font-bold">{currency}{amountNeeded}</span> more to unlock <span className="font-bold">FREE Delivery!</span></p>
                                        <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500" 
                                                style={{ width: `${progressPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* --- FIX: Professional Tiered Discount Message --- */}
                                {nextDiscountTier && subtotal > 0 && (
                                     <div className="bg-sky-50 border border-sky-200 text-sky-800 p-3 rounded-lg mb-4 text-center text-sm animate-fade-in-down">
                                        <p>Shop for <span className='font-bold'>{currency}{nextDiscountTier.amount - subtotal}</span> more & get <span className='font-bold'>{currency}{nextDiscountTier.discount} OFF!</span></p>
                                    </div>
                                )}

                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <p>Total MRP</p>
                                        <p className='font-medium text-gray-800'>{currency}{totalMRP}</p>
                                    </div>
                                    
                                    {totalSavings > 0 && (
                                        <div className="flex justify-between items-center bg-emerald-50 text-emerald-700 p-2 rounded-md">
                                            <p className='font-semibold'>Total Savings</p>
                                            <p className='font-bold'>- {currency}{totalSavings}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        <p className='font-medium text-gray-800'>{currency}{subtotal}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p>Delivery Fee</p>
                                        <p className={`font-medium ${isFreeDelivery ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                            {currency}{delivery_fee}
                                        </p>
                                    </div>
                                    
                                    {isFreeDelivery && (
                                        <div className="flex justify-between items-center bg-teal-50 text-teal-800 p-2 rounded-md transition-all duration-300 ease-in-out animate-fade-in-down">
                                            <p className='font-semibold'>🎉 Free Delivery Unlocked!</p>
                                            <p className='font-bold'>- {currency}{delivery_fee}</p>
                                        </div>
                                    )}

                                    {/* --- FIX: Display Coupon Discount --- */}
                                    {couponDiscount > 0 && (
                                        <div className="flex justify-between items-center bg-violet-50 text-violet-800 p-2 rounded-md transition-all duration-300 ease-in-out animate-fade-in-down">
                                            <p className='font-semibold'>✨ Coupon Discount!</p>
                                            <p className='font-bold'>- {currency}{couponDiscount}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-200 pt-4 mt-4">
                                        <p>Total</p>
                                        <p>{currency}{finalTotal}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg text-lg transform hover:scale-105 active:scale-100"
                                >
                                    Place your Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    @keyframes fadeInDown {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in-down {
        animation: fadeInDown 0.5s ease-out forwards;
    }
`;
document.head.appendChild(styles);

export default Cart;
