import React from 'react';
import Title from '../component/Title';

function ShippingPage() {
  return (
    <div className='min-h-screen py-20 bg-gradient-to-br from-[#f3d9c8] to-[#e8cbb3] text-[#141414]'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"SHIPPING"} text2={"& DELIVERY"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Information regarding our shipping methods and delivery times.
        </p>

        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>Domestic Shipping</h3>
          <p className='text-gray-700 mb-4'>
            We offer standard and expedited shipping options across India.
          </p>
          <ul className='list-disc list-inside text-gray-700 mb-4'>
            <li>**Standard Shipping:** Estimated delivery within 5-7 business days.</li>
            <li>**Expedited Shipping:** Estimated delivery within 2-3 business days.</li>
            <li>Shipping costs are calculated at checkout based on your order total and delivery location.</li>
          </ul>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>Order Processing</h3>
          <p className='text-gray-700'>
            Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking details once your order has shipped.
          </p>
        </div>
        {/* Add more details about international shipping, restrictions etc. */}
      </div>
    </div>
  );
}

export default ShippingPage;