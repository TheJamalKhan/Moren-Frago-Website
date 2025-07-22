import React from 'react';
import Title from '../component/Title'; // Adjust path if your Title component is elsewhere

function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen py-20 bg-gradient-to-br from-[#f3d9c8] to-[#e8cbb3] text-[#141414]'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"PRIVACY"} text2={"POLICY"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Your privacy is important to us.
        </p>

        <div className='p-6 bg-white rounded-lg shadow-md mb-6'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>1. Information We Collect</h3>
          <p className='text-gray-700'>
            We collect information you provide directly to us when you create an account, place an order, or contact us. This may include your name, email address, shipping address, phone number, and payment information.
          </p>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-md mb-6'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>2. How We Use Your Information</h3>
          <p className='text-gray-700'>
            We use the information we collect to process your orders, provide customer service, improve our services, and send you promotional communications (if you've opted in).
          </p>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>3. Data Security</h3>
          <p className='text-gray-700'>
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </p>
        </div>

        {/* You'll add your full privacy policy content here */}
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;