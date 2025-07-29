import React, { useContext, useMemo, useState, useEffect } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const PlaceOrder = () => {
    const { products, cartItem, getCartCount, currency, delivery_fee, clearCart } = useContext(shopDataContext);
    const { serverUrl, user } = useContext(authDataContext);
    const navigate = useNavigate();

    const [shippingDetails, setShippingDetails] = useState({
        fullName: '', phone: '', address: '', city: '', state: '', pincode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeError, setPincodeError] = useState('');

    const codFee = 100;

    const { subtotal, couponDiscount, isFreeDelivery, finalTotal } = useMemo(() => {
        let subtotal = 0, couponDiscount = 0;
        if (products.length > 0 && cartItem) {
            for (const [itemId, sizes] of Object.entries(cartItem)) {
                const itemInfo = products.find((product) => product._id === itemId);
                if (itemInfo) {
                    for (const quantity of Object.values(sizes)) {
                        subtotal += (itemInfo.price || 0) * quantity;
                    }
                }
            }
        }

        if (subtotal >= 4999) couponDiscount = 500;
        else if (subtotal >= 1999) couponDiscount = 200;

        const isFreeDelivery = subtotal >= 1500;
        let totalBeforeCod = (isFreeDelivery ? subtotal : subtotal + delivery_fee) - couponDiscount;
        
        const finalTotalValue = paymentMethod === 'cod' ? totalBeforeCod + codFee : totalBeforeCod;

        return { subtotal, couponDiscount, isFreeDelivery, finalTotal: finalTotalValue };
    }, [cartItem, products, delivery_fee, paymentMethod]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
        if (name === 'pincode') setPincodeError('');
    };

    const fetchLocationFromPincode = async () => {
        if (shippingDetails.pincode.length !== 6) {
            setPincodeError("Please enter a valid 6-digit PIN code.");
            return;
        }
        setPincodeLoading(true);
        setPincodeError('');
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${shippingDetails.pincode}`);
            const data = response.data[0];
            if (data.Status === 'Success') {
                const postOffice = data.PostOffice[0];
                setShippingDetails(prev => ({ ...prev, city: postOffice.District, state: postOffice.State }));
            } else {
                setPincodeError("Invalid PIN code. Please check and try again.");
            }
        } catch (error) {
            console.error("Failed to fetch location from PIN code:", error);
            setPincodeError("Could not fetch location. Please check your connection.");
        } finally {
            setPincodeLoading(false);
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // This data needs to be available inside the handler function
        const orderItems = Object.entries(cartItem).flatMap(([itemId, sizes]) => 
            Object.entries(sizes).map(([size, quantity]) => ({
                productId: itemId,
                quantity,
                size
            }))
        ).filter(item => item.quantity > 0);

        const nameParts = shippingDetails.fullName.trim().split(' ');
        const addressPayload = {
            ...shippingDetails,
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(' ')
        };
        delete addressPayload.fullName;

        if (paymentMethod === 'online') {
            try {
                const { data: { key } } = await axios.get(`${serverUrl}/api/getkey`);
                const { data: { order } } = await axios.post(`${serverUrl}/api/order/create-order`, {
                    amount: finalTotal,
                }, { withCredentials: true });

                const options = {
                    key,
                    amount: order.amount,
                    currency: "INR",
                    name: "Your Store Name",
                    description: "Order Payment",
                    image: "https://example.com/your_logo.jpg",
                    order_id: order.id,
                    handler: async function (response) {
                        try {
                            // Send all the necessary data to the backend for verification
                            const verificationResponse = await axios.post(`${serverUrl}/api/order/verify-payment`, {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                items: orderItems, // Sending the cart items
                                amount: finalTotal, // Sending the final amount
                                address: addressPayload // Sending the shipping address
                            }, { withCredentials: true });

                            if (verificationResponse.data.success) {
                                toast.success("Payment successful! Order placed.");
                                if (clearCart) clearCart();
                                // --- FIX: Navigate to the correct /order page ---
                                navigate('/order');
                            } else {
                                toast.error(verificationResponse.data.message || "Payment verification failed.");
                                setIsProcessing(false);
                            }
                        } catch (error) {
                            toast.error("An error occurred during payment verification.");
                            setIsProcessing(false);
                        }
                    },
                    prefill: {
                        name: shippingDetails.fullName,
                        email: user?.email || '',
                        contact: shippingDetails.phone,
                    },
                    notes: {
                        address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`,
                    },
                    theme: {
                        color: "#E8A444",
                    },
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    toast.error(`Payment failed: ${response.error.description}`);
                    setIsProcessing(false);
                });
                rzp1.open();

            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to initiate payment.");
                setIsProcessing(false);
            }
        } else { // COD Logic
            try {
                const response = await axios.post(`${serverUrl}/api/order/create`, {
                    items: orderItems,
                    amount: finalTotal,
                    address: addressPayload,
                    paymentMethod: 'COD'
                }, { withCredentials: true });

                if (response.data.success) {
                    toast.success("Order placed successfully!");
                    if (clearCart) clearCart();
                    navigate('/order');
                } else {
                    toast.error(response.data.message || "Failed to place order.");
                }
            } catch (error) {
                console.error("Failed to place COD order:", error);
                toast.error(error.response?.data?.message || "Could not place order.");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen pt-24 md:pt-28 pb-28 md:pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4A2E2A] mb-8 tracking-wide">Place Your Order</h1>
                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Shipping Address</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <label className="block text-gray-600 mb-1">Full Name</label>
                                    <input type="text" name="fullName" value={shippingDetails.fullName} onChange={handleInputChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500" placeholder="Jamal Khan" />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Phone Number</label>
                                    <input type="tel" name="phone" value={shippingDetails.phone} onChange={handleInputChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500" placeholder="+91 12345 67890" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-gray-600 mb-1">Address</label>
                                    <input type="text" name="address" value={shippingDetails.address} onChange={handleInputChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500" placeholder="123, Main Street" />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Pincode</label>
                                    <input type="text" name="pincode" value={shippingDetails.pincode} onChange={handleInputChange} onBlur={fetchLocationFromPincode} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500" placeholder="e.g., 400001" />
                                    {pincodeLoading && <p className="text-xs text-gray-500 mt-1">Fetching location...</p>}
                                    {pincodeError && <p className="text-xs text-red-500 mt-1">{pincodeError}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">City / District</label>
                                    <input type="text" name="city" value={shippingDetails.city} onChange={handleInputChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500" placeholder="Mumbai" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-gray-600 mb-1">State</label>
                                    <select name="state" value={shippingDetails.state} onChange={handleInputChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 bg-white">
                                        <option value="" disabled>Select your state</option>
                                        {indianStates.map(state => (<option key={state} value={state}>{state}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Payment Method</h2>
                            <div className="space-y-3 text-sm">
                                <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-amber-50 has-[:checked]:border-amber-500 cursor-pointer">
                                    <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-amber-600 focus:ring-amber-500" />
                                    <span className="ml-3 text-gray-700 font-medium">Online Payment (via Razorpay)</span>
                                </label>
                                <div>
                                    <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-amber-50 has-[:checked]:border-amber-500 cursor-pointer">
                                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-amber-600 focus:ring-amber-500" />
                                        <span className="ml-3 text-gray-700 font-medium">Cash on Delivery (COD)</span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2 px-1">
                                        <b>Save ₹100:</b> A convenience fee is applied to COD orders. <a href="#" onClick={(e) => { e.preventDefault(); setPaymentMethod('online'); }} className="text-amber-600 font-semibold hover:underline">Pay online to avoid this charge.</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-6 lg:sticky lg:top-28">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Order Summary</h2>
                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <p>Subtotal ({getCartCount} items)</p>
                                    <p className='font-medium text-gray-800'>{currency}{subtotal}</p>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-violet-600">
                                        <p>Coupon Discount</p>
                                        <p className='font-medium'>- {currency}{couponDiscount}</p>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <p>Delivery Fee</p>
                                    <p className={`font-medium ${isFreeDelivery ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                        {currency}{delivery_fee}
                                    </p>
                                </div>
                                {isFreeDelivery && (
                                    <div className="flex justify-between text-teal-600">
                                        <p>Delivery Discount</p>
                                        <p className='font-medium'>- {currency}{delivery_fee}</p>
                                    </div>
                                )}
                                {paymentMethod === 'cod' && (
                                    <div className="flex justify-between">
                                        <p>Cash on Delivery Fee</p>
                                        <p className="font-medium text-gray-800">{currency}{codFee}</p>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-3 mt-3">
                                    <p>Total Amount</p>
                                    <p>{currency}{finalTotal}</p>
                                </div>
                            </div>
                            <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg text-lg transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isProcessing ? 'Processing...' : `Pay ${currency}${finalTotal}`}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlaceOrder;
