import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { useInView } from 'react-intersection-observer';

function Bottle() {
  const { products } = useContext(shopDataContext);
  const [bottleProducts, setBottleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const filteredProducts = products.filter(
        (item) => item.category && item.category.trim().toLowerCase() === 'daily-gears'
      );
      setBottleProducts(filteredProducts.slice(0, 3));
    } else {
      setBottleProducts([]);
    }
    setLoading(false);
  }, [products]);

  return (
    <div
      ref={ref}
      className={`bg-[#e8cbb3] py-12 transition-all duration-1000 ease-out transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        fontFamily: `'Segoe UI', 'Helvetica Neue', 'Roboto', 'Inter', sans-serif`,
        fontWeight: 300,
        letterSpacing: '0.5px',
      }}
    >
      <div className='w-[100%] text-center mb-8'>
        <Title text1={"HYDRATION"} text2={"ESSENTIALS"} />
        {/* Removed specific font classes to inherit from the parent div */}
        <p className='w-[90%] md:w-full m-auto text-[13px] md:text-[20px] px-[10px] text-[#800000]'>
          Stay Refreshed on the Go 💧<br /> Explore Our Premium Bottle Collection.
        </p>
      </div>

      <div className='w-full mt-[30px] px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 place-items-center'>
        {loading ? (
          <p className="text-gray-700 text-lg col-span-full">Loading our bottle collection...</p>
        ) : bottleProducts.length === 0 ? (
          <p className="text-gray-700 text-center mt-10 col-span-full">
            Our bottle collection is currently empty. Please check back later!
          </p>
        ) : (
          bottleProducts.map((item) => (
            <div key={item._id} className="w-full max-w-sm">
              <Card
                id={item._id}
                name={item.name}
                image1={item.image1}
                image3={item.image3}
                price={item.price}
                mrp={item.mrp}
                discountPercentage={item.discountPercentage}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bottle;
