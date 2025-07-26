import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
      setLoading(false);
    } else {
      setLatestProducts([]);
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="mt-12 md:mt-16">
      <div className='w-full text-center'>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className='w-full m-auto text-sm md:text-base px-3 text-[#800000]'>
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* --- FIX: Updated className to match BestSeller.jsx exactly --- */}
      <div className='w-full mt-[30px] px-6 md:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
        {loading ? (
          <p className="text-gray-500 text-lg col-span-full">Loading latest products...</p>
        ) : latestProducts.length === 0 ? (
          <p className="text-gray-500 text-lg col-span-full">No latest products to display.</p>
        ) : (
          latestProducts.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              image1={item.image1}
              image3={item.image3}
              id={item._id}
              price={item.price}
              mrp={item.mrp}
              discountPercentage={item.discountPercentage}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default LatestCollection;