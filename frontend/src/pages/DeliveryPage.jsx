import React from 'react';
import Title from '../component/Title';
import { Link } from 'react-router-dom';

function DeliveryPage() {
  return (
    <div className='min-h-screen py-20 bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-black'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Understand our shipping process and delivery timelines.
        </p>

        <div className='bg-white p-6 rounded-lg shadow-xl border border-gray-200 mb-8'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>1. Order Processing Time</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            Once your order is placed, our team works diligently to process it. Orders are typically processed within <strong>1-2 business days</strong> (Monday-Friday, excluding public holidays). You will receive an email confirmation once your order is processed and ready for shipment.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>2. Shipping Methods & Timelines</h3>
          <p className='text-gray-700 leading-relaxed mb-2'>We offer the following shipping options:</p>
          <ul className='list-disc list-inside text-gray-700 space-y-2 mb-4'>
            <li><strong>Standard Shipping:</strong> Estimated delivery within <strong>5-7 business days</strong> after dispatch.</li>
            <li><strong>Expedited Shipping:</strong> Estimated delivery within <strong>2-3 business days</strong> after dispatch (available for select locations at an additional cost).</li>
          </ul>
          <p className='text-gray-700 leading-relaxed'>
            Delivery times are estimates and commence from the date of dispatch, rather than the date of order. They are provided as guidelines only and are subject to change due to unforeseen circumstances or peak seasons.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>3. Shipping Costs</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            A flat delivery charge of <strong>₹40</strong> will be applied to all orders. Shipping costs are calculated at checkout based on your order value, weight, and delivery location. We occasionally offer free shipping promotions, so keep an eye on our announcements!
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>4. Tracking Your Order</h3>
          <p className='text-gray-700 leading-relaxed'>
            Once your order has been shipped, you will receive a shipping confirmation email containing your tracking number and a link to track your package directly. You can also visit our <Link to="/help-center" className="text-[#d97706] hover:underline">Help Center</Link> for more information on tracking.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPage;