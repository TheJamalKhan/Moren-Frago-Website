// BestSeller.jsx
import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filterProduct = products.filter((item) => item.bestseller);
      setBestSeller(filterProduct.slice(4, 12)); // Still slicing to 4 for Best Sellers
    }
  }, [products]);

  return (
    <div>
      <div className='h-[8%] w-[100%] text-center mt-[50px]'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-[#800000]'>
          Loved by Customers ❤️<br /> Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* --- MODIFIED SECTION FOR GRID LAYOUT --- */}
      {/* Changed from flex to grid, adjusted grid columns and gap to match LatestCollection */}
      <div className='w-full mt-[30px] px-6 md:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
              mrp={item.mrp}
              discountPercentage={item.discountPercentage}
              // IMPORTANT: Removed customWidthClasses prop here.
              // The Card component will now size itself based on the grid layout,
              // matching how it behaves in LatestCollection.
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10 col-span-full">No best-selling products found.</p>
        )}
      </div>
      {/* --- END MODIFIED SECTION --- */}
    </div>
  );
}

export default BestSeller;