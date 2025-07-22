import React from 'react';
import Title from '../component/Title';

function TermsPage() {
  return (
    <div className='min-h-screen py-20 bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-black'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"TERMS &"} text2={"CONDITIONS"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Please read our terms of service carefully before using our website.
        </p>

        <div className='bg-white p-6 rounded-lg shadow-xl border border-gray-200 mb-8'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>1. Acceptance of Terms</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            By accessing or using the Moren Frago website, you agree to be bound by these Terms & Conditions and all terms incorporated by reference. If you do not agree to all of these terms, do not use this website.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>2. Use of the Website</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the website.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>3. Product Information</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            We strive to ensure that all information on this site is accurate and complete, but we do not warrant that product descriptions or other content are error-free. Colors and sizes shown are approximate and may vary depending on your monitor settings and manufacturing variations.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>4. Pricing and Payment</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            All prices are listed in Indian Rupees (INR) unless otherwise specified and are subject to change without notice. We accept various payment methods as detailed on our payment information page. Payments are processed securely via Razorpay.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>5. Intellectual Property</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            All content on this website, including text, graphics, logos, images, and software, is the property of Moren Frago or its content suppliers and is protected by intellectual property laws.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>6. Limitation of Liability</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            Moren Frago shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or products.
          </p>

          <h3 className='text-2xl font-semibold text-gray-900 mb-4 mt-6'>7. Governing Law</h3>
          <p className='text-gray-700 leading-relaxed'>
            These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in [Patna, Bihar].
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;