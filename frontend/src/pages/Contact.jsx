import React, { useState } from 'react';
import Title from '../component/Title';
import contactImage from '../assets/contact.jpg'; // Corrected image name to lowercase 'c'
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function ContactPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert('Please fill in all fields before sending your message.');
      return;
    }

    // --- Constructing the mailto: link ---
    const recipient = 'morenfrago@yahoo.com';
    const subject = encodeURIComponent(`Contact Form Submission from ${name} (${email})`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open the user's default email client
    window.location.href = mailtoUrl;

    // Provide user feedback (optional, as the mail client opening is usually obvious)
    alert('Your email client should open shortly with your message pre-filled. Please click "Send" there to complete sending.');

    // Clear the form fields after successful attempt to open mail client
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    // Main container: full width, responsive vertical padding, light gradient background
    <div className='w-full min-h-screen py-20 bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-black'>
      <div className='max-w-6xl mx-auto px-4'>

        {/* Contact Us Title */}
        <div className='mb-10'>
          <Title text1={"CONTACT"} text2={"US"} />
        </div>

        {/* Main Content Section: Responsive Grid for Image and Form/Info */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start'>

          {/* Left Column: Image with Text Overlay */}
          <div className='relative w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl'>
            <img
              src={contactImage}
              alt="Reach out to Moren Frago"
              className='w-full h-full object-cover object-center'
            />
            {/* Image Overlay Content */}
            <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center'>
              <p className='text-3xl md:text-4xl font-bold mb-2 text-[#e6b892]'>GET IN TOUCH</p>
              <p className='text-lg md:text-xl font-medium mb-4'>We're here to help!</p>
              <div className='text-base md:text-lg italic px-4'>
                "Your questions, our answers. Reach out today."
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form and Info */}
          <div className='space-y-8'>

            {/* Contact Information Section */}
            <div className='bg-white p-6 rounded-lg shadow-xl border border-gray-200'> {/* Enhanced shadow and border */}
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Our Details</h3>
              <div className='space-y-3 text-gray-700 text-lg'> {/* Increased text size slightly for readability */}
                <p className='flex items-center gap-3'><MdEmail className='text-2xl text-[#d97706]'/> Email: <a href="mailto:morenfrago@yahoo.com" className='hover:text-[#d97706] transition-colors'>morenfrago@yahoo.com</a></p>
                <p className='flex items-center gap-3'><MdPhone className='text-2xl text-[#d97706]'/> Phone: <a href="tel:+919162350466" className='hover:text-[#d97706] transition-colors'>+91 9162350466</a></p>
                <p className='flex items-center gap-3'><FaMapMarkerAlt className='text-2xl text-[#d97706]'/> Meher Manzil, Sultanganj, Mahendru, Patna, Bihar 800006</p>
                <p className='flex items-center gap-3'><FaClock className='text-2xl text-[#d97706]'/> Business Hours: 24/7</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className='bg-white p-6 rounded-lg shadow-xl border border-gray-200'> {/* Enhanced shadow and border */}
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label htmlFor="name" className='block text-gray-700 text-sm font-medium mb-1'>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706] transition-colors'
                    placeholder='Your Name'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className='block text-gray-700 text-sm font-medium mb-1'>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706] transition-colors'
                    placeholder='Your Email'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className='block text-gray-700 text-sm font-medium mb-1'>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706] transition-colors'
                    placeholder='Your Message'
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className='w-full px-6 py-3 bg-[#d97706] text-white font-semibold rounded-lg hover:bg-[#c26c05] transition-colors shadow-md'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;