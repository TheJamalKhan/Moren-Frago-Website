import React, { useState } from 'react'; // Import useState for accordion functionality
import Title from '../component/Title';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Icons for accordion

function FAQPage() {
  // State to manage the open/closed state of FAQ items (accordion effect)
  const [openFAQ, setOpenFAQ] = useState(null); // Stores the index of the currently open FAQ item

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // If clicked item is open, close it; otherwise, open it
  };

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping usually takes 5-7 business days. Expedited options are available at checkout for faster delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day easy return guarantee. If you're not completely satisfied, you can return your item within 7 days of delivery. Full details are available on our Returns & Refunds page."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only offer shipping within India. We are working on expanding our delivery services internationally in the near future!"
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number on our 'Track Your Order' page to get real-time updates on your delivery status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, RuPay), Net Banking, UPI, and Cash on Delivery (COD) for eligible orders."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, absolutely. We use industry-standard encryption and security protocols to protect your personal and payment information. Please refer to our Privacy Policy for more details."
    }
  ];

  return (
    <div className='min-h-screen py-20 bg-gradient-to-br from-[#f3d9c8] to-[#e8cbb3] text-[#141414]'>
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"FREQUENTLY"} text2={"ASKED QUESTIONS"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Find quick answers to the most common questions about shopping with us.
        </p>

        {/* FAQ Items Grid/List */}
        <div className='space-y-4'> {/* Added space-y for consistent vertical gap between items */}
          {faqItems.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg'
            >
              <button
                className='w-full flex justify-between items-center p-5 font-semibold text-left text-gray-900 focus:outline-none'
                onClick={() => toggleFAQ(index)}
                aria-expanded={openFAQ === index}
              >
                <h3 className='text-lg md:text-xl'>{item.question}</h3>
                {openFAQ === index ? (
                  <FaChevronUp className='text-xl text-[#d97706]' /> // Up arrow when open
                ) : (
                  <FaChevronDown className='text-xl text-[#d97706]' /> // Down arrow when closed
                )}
              </button>
              {/* Answer Content - Accordion Effect */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-screen opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 p-0'
                }`}
              >
                <p className='text-gray-700 border-t border-gray-200 pt-5'>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQPage;