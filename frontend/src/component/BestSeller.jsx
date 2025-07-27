import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { useInView } from 'react-intersection-observer';

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (products && products.length > 0) {
      const filterProduct = products.filter((item) => item.bestseller);
      setBestSeller(filterProduct.slice(7, 20));
    }
  }, [products]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        fontFamily: `'Segoe UI', 'Helvetica Neue', 'Roboto', 'Inter', sans-serif`,
        fontWeight: 300,
        letterSpacing: '0.5px',
      }}
    >
      <div className='h-[8%] w-[100%] text-center mt-[50px]'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-[#800000]'>
          Loved by Customers ❤️<br /> Discover Our All-Time Best Sellers.
        </p>
      </div>

      <div className='w-full mt-[30px] px-6 md:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
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
        ) : (
          <p className="text-gray-500 text-center mt-10 col-span-full">No best-selling products found.</p>
        )}
      </div>
    </div>
  );
}

export default BestSeller;
