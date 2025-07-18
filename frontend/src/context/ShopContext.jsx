// ShopContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';

export const shopDataContext = createContext();

function ShopContext({ children }) {
    let [products, setProducts] = useState([]); // Ensure initial state is an empty array
    let { serverUrl } = useContext(authDataContext);
    let currency = '₹';
    let delivery_fee = 40;

    console.log("ShopContext: Initializing, serverUrl:", serverUrl);

    const getProducts = async () => {
        if (!serverUrl) {
            console.warn("ShopContext: serverUrl not available yet. Skipping product fetch.");
            return;
        }
        try {
            const apiEndpoint = serverUrl + "/api/product/list";
            console.log("ShopContext: Attempting to fetch products from:", apiEndpoint);
            let result = await axios.get(apiEndpoint);
            console.log("ShopContext: Products fetched successfully:", result.data);
            setProducts(result.data.data || []); // Ensure you're setting the 'data' array, not the whole response object
                                                // Added || [] to ensure it's always an array
        } catch (error) {
            console.error("ShopContext: Error fetching products:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            } else if (error.request) {
                console.error("Error request:", error.request);
            
            } else {
                console.error("Error message:", error.message);
            }
            setProducts([]); // Set to empty array on error to prevent issues
        }
    };

    useEffect(() => {
        getProducts();
    }, [serverUrl]); // Dependency on serverUrl

    let value = {
        products,
        currency,
        delivery_fee,
        getProducts
    };

    return (
        <div>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </div>
    );
}

export default ShopContext;