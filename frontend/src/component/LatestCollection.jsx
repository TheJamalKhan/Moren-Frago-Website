// LatestCollection.jsx
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
      setLoading(false);
      console.log("LatestCollection: Products ready for mapping:", products.slice(0, 8));
    } else if (Array.isArray(products) && products.length === 0) {
      setLatestProducts([]);
      setLoading(false);
      console.log("LatestCollection: Products array is empty.");
    } else {
      setLatestProducts([]);
      setLoading(true);
      console.log("LatestCollection: Products not yet an array from context.", products);
    }
  }, [products]);

  return (
    <div>
      <div className='h-[8%] w-full text-center md:mt-[50px]'>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className='w-full m-auto text-[13px] md:text-[20px] px-[10px] text-[#800000]'>
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* MODIFIED: Adjusted px-4 to px-6 md:px-12 for more side space */}
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
              image={item.image1}
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