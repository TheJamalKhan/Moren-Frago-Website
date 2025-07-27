import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { useInView } from 'react-intersection-observer';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts(products.slice(3, 11));
      setLoading(false);
    } else {
      setLatestProducts([]);
      setLoading(false);
    }
  }, [products]);

  return (
    <>
      {/* Font Style Embed */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div
        ref={ref}
        className={`mt-12 md:mt-16 transition-all duration-1000 ease-out transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className='w-full text-center'>
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className='w-full m-auto text-sm md:text-base px-3 text-[#800000]'>
            Step Into Style – New Collection Dropping This Season!
          </p>
        </div>

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
    </>
  );
}

export default LatestCollection;
