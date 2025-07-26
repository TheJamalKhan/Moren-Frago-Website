import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';

export const shopDataContext = createContext(null);

function ShopContext({ children }) {
    const { serverUrl } = useContext(authDataContext);
    const { userData } = useContext(userDataContext);

    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState({});
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    
    const currency = '₹';
    const delivery_fee = 40;

    useEffect(() => {
        const getProducts = async () => {
            if (!serverUrl) return;
            setLoading(true);
            try {
                const result = await axios.get(`${serverUrl}/api/product/list`);
                setProducts(result.data.data || []);
            } catch (error) {
                console.error("ShopContext: Error fetching products:", error);
            }
            setLoading(false);
        };
        getProducts();
    }, [serverUrl]);

    useEffect(() => {
        const getUserCart = async () => {
            if (!serverUrl || !userData) return;
            try {
                const result = await axios.post(`${serverUrl}/api/cart/get`, {}, { withCredentials: true });
                setCartItem(result.data || {});
            } catch (error) {
                console.log("Could not fetch user cart. It may be empty or new.");
                setCartItem({});
            }
        };

        if (userData) {
            getUserCart();
        } else {
            setCartItem({});
        }
    }, [userData, serverUrl]);

    useEffect(() => {
        let total = 0;
        if (cartItem && typeof cartItem === 'object') {
            for (const item of Object.values(cartItem)) {
                if (item && typeof item === 'object') {
                    for (const quantity of Object.values(item)) {
                        if (typeof quantity === 'number') {
                            total += quantity;
                        }
                    }
                }
            }
        }
        setCartCount(total);
    }, [cartItem]);


    const addToCart = async (itemId, size) => {
        const product = products.find(p => p._id === itemId);
        if (!product) {
            toast.error("Could not find product details.");
            return;
        }

        if (product.category === 'Men' && !size) {
            toast.error("Please select a size for this item.");
            return;
        }

        const cartKey = product.category === 'Men' ? size : 'default';

        setCartItem(prevCart => {
            const newCart = JSON.parse(JSON.stringify(prevCart));
            const currentQty = newCart[itemId]?.[cartKey] || 0;
            if (!newCart[itemId]) {
                newCart[itemId] = {};
            }
            newCart[itemId][cartKey] = currentQty + 1;
            return newCart;
        });

        if (userData) {
            try {
                await axios.post(`${serverUrl}/api/cart/add`, { itemId, size: cartKey }, { withCredentials: true });
            } catch (error) {
                toast.error("Failed to save cart. Please refresh.");
                console.error("❌ Failed to sync 'add to cart':", error);
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        if (quantity < 0) return;
        setCartItem(prevCart => {
            const newCart = JSON.parse(JSON.stringify(prevCart));
            if (newCart[itemId]?.[size] !== undefined) {
                if (quantity === 0) {
                    delete newCart[itemId][size];
                    if (Object.keys(newCart[itemId]).length === 0) {
                        delete newCart[itemId];
                    }
                } else {
                    newCart[itemId][size] = quantity;
                }
            }
            return newCart;
        });

        if (userData) {
            try {
                // IMPORTANT: The "404 Not Found" error means your backend server
                // does not have an API endpoint at "/api/cart/update".
                // You must create a POST route for this path in your backend code
                // for this function to work.
                await axios.post(`${serverUrl}/api/cart/update`, { itemId, size, quantity }, { withCredentials: true });
            } catch (error) {
                console.log("Update quantity failed. Check backend route.", error);
                toast.error("Could not update item quantity.");
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        if (products.length > 0) {
            for (const [itemId, sizes] of Object.entries(cartItem)) {
                const itemInfo = products.find((product) => product._id === itemId);
                if (itemInfo) {
                    for (const quantity of Object.values(sizes)) {
                        totalAmount += itemInfo.price * quantity;
                    }
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        products,
        cartItem,
        addToCart,
        updateQuantity,
        getCartAmount,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        loading,
        currency,
        delivery_fee,
        getCartCount: cartCount,
    };

    return (
        <shopDataContext.Provider value={contextValue}>
            {children}
        </shopDataContext.Provider>
    );
}

export default ShopContext;
