import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card'; // Make sure to import your Card component

function RelatedProduct({ category, currentProductId }) {
 const { products } = useContext(shopDataContext);
 const [relatedProducts, setRelatedProducts] = useState([]);

 useEffect(() => {
 if (products && products.length > 0 && category && currentProductId) {
 const filteredProducts = products.filter(p => 
 // Find products in the same category
 p.category === category && 
 // Exclude the current product itself
 String(p.id || p._id) !== String(currentProductId)
 );
 // Set the state with a maximum of 4 related products
 setRelatedProducts(filteredProducts.slice(0, 8));
 }
 }, [products, category, currentProductId]); // Re-run when these change

 // If there are no related products, render nothing
 if (relatedProducts.length === 0) {
 return null;
 }

 return (
 <div className="mt-24 pt-12 border-t border-stone-300">
 <h2 className="text-3xl font-bold text-center text-stone-800 mb-8">You Might Also Like</h2>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
 {relatedProducts.map((item) => (
 <Card
 key={item.id || item._id}
 id={item.id || item._id}
 name={item.name}
 image1={item.image1}
 image3={item.image3}
 price={item.price || item.new_price}
 mrp={item.mrp || item.old_price}
 />
 ))}
 </div>
 </div>
 );
}

export default RelatedProduct;