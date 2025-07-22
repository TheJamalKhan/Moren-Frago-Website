import React from 'react';
import Title from '../component/Title';

function ReturnsPage() {
  return (
    <div className='min-h-screen py-20 bg-gradient-to-br from-[#f3d9c8] to-[#e8cbb3] text-[#141414]'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"RETURNS &"} text2={"REFUNDS"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Our policy for hassle-free returns and refunds.
        </p>

        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>7-Day Easy Return Guarantee</h3>
          <p className='text-gray-700 mb-4'>
            We want you to be completely satisfied with your purchase. If for any reason you are not, we offer a 7-day easy return guarantee from the date of delivery.
          </p>
          <h4 className='text-lg font-medium text-gray-800 mb-1'>Conditions for Return:</h4>
          <ul className='list-disc list-inside text-gray-700 mb-4'>
            <li>Item(s) must be unused, unwashed, and in their original condition.</li>
            <li>All tags and packaging must be intact.</li>
            <li>Proof of purchase (order number or invoice) is required.</li>
          </ul>
          <h4 className='text-lg font-medium text-gray-800 mb-1'>How to Initiate a Return:</h4>
          <p className='text-gray-700'>
            Please contact our customer support team at [morenfrago@yahoo.com] or visit our FAQ page for step-by-step instructions.
          </p>
        </div>
        {/* Add more details about refunds, exchange process etc. */}
      </div>
    </div>
  );
}

export default ReturnsPage;