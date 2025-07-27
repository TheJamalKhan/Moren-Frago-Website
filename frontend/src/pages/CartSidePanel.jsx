import React, { useContext, useMemo } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiPlus, FiMinus, FiX } from 'react-icons/fi';

const CartSidePanel = () => {
    const {
        products,
        cartItem,
        updateQuantity,
        getCartCount,
        currency,
        isCartOpen,
        setIsCartOpen
    } = useContext(shopDataContext);

    const navigate = useNavigate();

    // --- FIX: Added full discount and savings logic ---
    const { subtotal, couponDiscount, nextDiscountTier } = useMemo(() => {
        let subtotal = 0;
        let couponDiscount = 0;
        let nextDiscountTier = { amount: 1999, discount: 200 }; // Default next tier

        if (products.length > 0) {
            for (const [itemId, sizes] of Object.entries(cartItem)) {
                const itemInfo = products.find((product) => product._id === itemId);
                if (itemInfo) {
                    for (const quantity of Object.values(sizes)) {
                        subtotal += (itemInfo.price || 0) * quantity;
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
            nextDiscountTier = { amount: 4999, discount: 500 }; // Next tier is 500 off
        }

        return { subtotal, couponDiscount, nextDiscountTier };
    }, [cartItem, products]);

    const finalTotal = subtotal - couponDiscount;

    const handleCheckout = () => {
        setIsCartOpen(false); // Close the panel
        navigate('/cart'); // Navigate to the full cart/checkout page
    };

    if (!isCartOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 transition-opacity duration-300"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Side Panel */}
            <div className={`relative z-10 flex flex-col w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-500 hover:text-black">
                        <FiX size={24} />
                    </button>
                </div>

                {/* --- FIX: Added professional discount message --- */}
                {nextDiscountTier && subtotal > 0 && (
                     <div className="bg-sky-50 border-b border-sky-200 text-sky-800 p-3 text-center text-sm">
                        <p>Shop for <span className='font-bold'>{currency}{nextDiscountTier.amount - subtotal}</span> more & get <span className='font-bold'>{currency}{nextDiscountTier.discount} OFF!</span></p>
                    </div>
                )}

                {/* Cart Items */}
                {getCartCount > 0 ? (
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="divide-y divide-gray-200">
                            {Object.entries(cartItem).map(([itemId, sizes]) => {
                                const itemInfo = products.find(p => p._id === itemId);
                                if (!itemInfo) return null;

                                return Object.entries(sizes).map(([size, quantity]) => {
                                    if (quantity <= 0) return null;
                                    
                                    let imageUrl = `https://placehold.co/80x100/F9F6F2/4A2E2A?text=No+Image`;
                                    if (itemInfo.image1) imageUrl = itemInfo.image1;

                                    return (
                                        <div key={`${itemId}-${size}`} className="flex items-center gap-4 py-4">
                                            <img 
                                                src={imageUrl} 
                                                alt={itemInfo.name} 
                                                className="w-20 h-24 object-cover rounded-md flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{itemInfo.name}</h3>
                                                {itemInfo.category === 'Men' && (
                                                    <p className="text-xs text-gray-500 mt-1">Size: {size}</p>
                                                )}
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="font-bold text-[#4A2E2A] text-sm">{currency}{itemInfo.price}</p>
                                                    <div className="flex items-center border rounded-full">
                                                        <button onClick={() => updateQuantity(itemId, size, quantity - 1)} className="p-1 text-gray-600">
                                                            <FiMinus size={14} />
                                                        </button>
                                                        <span className="px-3 text-sm font-medium">{quantity}</span>
                                                        <button onClick={() => updateQuantity(itemId, size, quantity + 1)} className="p-1 text-gray-600">
                                                            <FiPlus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                        <h3 className="text-xl font-semibold text-gray-700">Your cart is empty</h3>
                        <p className="text-gray-500 mt-2">Add items to your cart to see them here.</p>
                    </div>
                )}

                {/* Footer */}
                {getCartCount > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        {couponDiscount > 0 && (
                            <div className="flex justify-between items-center bg-violet-50 text-violet-800 p-2 rounded-md mb-4 text-sm">
                                <p className='font-semibold'>✨ Coupon Discount Applied!</p>
                                <p className='font-bold'>- {currency}{couponDiscount}</p>
                            </div>
                        )}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-md font-semibold text-gray-800">Estimated Total</p>
                            <p className="text-lg font-bold text-black">{currency}{finalTotal}</p>
                        </div>
                        <p className="text-xs text-gray-500 text-center mb-4">Taxes & shipping calculated on the next page.</p>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidePanel;
