import React, { useState, useEffect } from 'react';
import Title from '../component/Title';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// --- Dummy FAQ Data ---
const allFaqs = [
  {
    id: 1,
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes 5-7 business days. Expedited options are available at checkout. International shipping times vary based on destination."
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer: "We offer a 7-day easy return guarantee from the date of delivery. Items must be unused and in original condition. Please see our Returns & Refunds page for full details."
  },
  {
    id: 3,
    question: "How can I track my order?",
    answer: "You will get tracking updates directly in your email. Stay updated!"
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer: "We accept payments via **Razorpay**, providing a secure and seamless checkout experience. You can pay using **Credit Cards, Debit Cards, Net Banking (all major Indian banks), UPI (Google Pay, PhonePe, Paytm, etc.), and popular Wallets (Paytm, Mobikwik, Freecharge, etc.)**." // <--- UPDATED THIS LINE
  },
  {
    id: 5,
    question: "Do you offer international shipping?",
    answer: "Yes, we do! International shipping costs and delivery times will be calculated at checkout based on your location."
  },
  {
    id: 6,
    question: "How do I exchange an item?",
    answer: "Our Quick & Simple Exchange process allows you to exchange items within 7 days of delivery. Contact our support team to initiate an exchange."
  },
  {
    id: 7,
    question: "Where can I find my order history?",
    answer: "You can view your complete order history by logging into your account and navigating to the 'My Orders' section."
  },
  {
    id: 8,
    question: "Is customer support available 24/7?",
    answer: "Our customer support team is available from 9 AM to 6 PM IST, Monday to Saturday. You can reach us via email or phone."
  },
];
// --- End Dummy FAQ Data ---

function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(allFaqs);
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredFaqs(allFaqs);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const results = allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(lowercasedSearchTerm) ||
        faq.answer.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredFaqs(results);
    }
  }, [searchTerm]);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className='min-h-screen py-20 bg-gradient-to-br from-[#f3d9c8] to-[#e8cbb3] text-[#141414]'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"HELP"} text2={"CENTER"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          How can we help you today?
        </p>

        {/* Search Bar Section */}
        <div className='mb-8 p-6 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-center gap-4'>
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='
              flex-grow w-full h-12 px-4
              rounded-lg sm:rounded-l-lg sm:rounded-r-none
              border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d97706]
              transition-all duration-200 ease-in-out
            '
          />
          <button
            onClick={() => setSearchTerm(searchTerm)}
            className='
              w-full sm:w-auto h-12 px-6
              bg-[#d97706] text-white font-semibold
              rounded-lg sm:rounded-r-lg sm:rounded-l-none
              hover:bg-[#c26c05] transition-colors duration-200 ease-in-out
            '
          >
            Search
          </button>
        </div>

        {/* Filtered FAQ List */}
        <div className='mb-8'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4 text-center'>
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Popular Topics'}
          </h3>
          <div className='space-y-4'>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <div key={faq.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <button
                    className='w-full text-left p-4 flex justify-between items-center text-lg font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none'
                    onClick={() => toggleFaq(faq.id)}
                  >
                    {faq.question}
                    {openFaqId === faq.id ? <FaChevronUp className='text-gray-600' /> : <FaChevronDown className='text-gray-600' />}
                  </button>
                  {openFaqId === faq.id && (
                    <div className='p-4 pt-0 text-gray-700 border-t border-gray-200 animate-fadeIn'>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className='text-center text-gray-600 text-lg p-6 bg-white rounded-lg shadow-md'>
                No FAQs found for your search. Please try a different query.
              </p>
            )}
          </div>
        </div>

        {/* Other Quick Links */}
        <div className='mb-8'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4 text-center'>Quick Links</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Link to="/faq" className='p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center'>
              <h4 className='font-medium text-lg text-gray-800'>All FAQs</h4>
              <p className='text-sm text-gray-600'>Browse all questions and answers.</p>
            </Link>
            <Link to="/returns" className='p-4 bg-white rounded-lg shadow-lg hover:shadow-lg transition-shadow text-center'>
              <h4 className='font-medium text-lg text-gray-800'>Returns & Refunds</h4>
              <p className='text-sm text-gray-600'>Learn about our easy return process.</p>
            </Link>
            <Link to="/shipping" className='p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center'>
              <h4 className='font-medium text-lg text-gray-800'>Shipping & Delivery</h4>
              <p className='text-sm text-gray-600'>Understand delivery times and costs.</p>
            </Link>
            <Link to="/contact" className='p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center'>
              <h4 className='font-medium text-lg text-gray-800'>Contact Us</h4>
              <p className='text-sm text-gray-600'>Can't find an answer? Reach out!</p>
            </Link>
          </div>
        </div>

        {/* Direct Contact Options */}
        <div className='p-6 bg-white rounded-lg shadow-md text-center'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Still Need Help?</h3>
          <p className='text-gray-700 mb-4'>
            Our support team is ready to assist you.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <a href="mailto:morenfrago@yahoo.com" className='px-6 py-3 bg-[#d97706] text-white font-semibold rounded-lg hover:bg-[#c26c05] transition-colors'>
              Email Support
            </a>
            <a href="tel:+919162350466" className='px-6 py-3 border-2 border-[#d97706] text-[#d97706] font-semibold rounded-lg hover:bg-[#f8e0d4] transition-colors'>
            Call Us
               </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPage;