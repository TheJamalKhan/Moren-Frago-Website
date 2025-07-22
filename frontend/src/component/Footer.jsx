import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

function Footer() {
  return (
    // Main footer container: flexible height, dark background, responsive padding
    <div className='w-full bg-[#061414ec] text-[#fdfdfd] py-10 px-4 md:px-8 lg:px-16'>
      <div className='max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>

        {/* Column 1: Company Info / Brand */}
        <div className='flex flex-col items-start justify-start gap-4'>
          <div className='flex items-center justify-start gap-2'>
            <img src={logo} alt="Moren Frago Logo" className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'/>
            <p className='text-xl md:text-2xl text-[#e6b892] font-semibold'>Moren Frago</p>
          </div>
          <p className='text-sm leading-relaxed text-gray-300 hidden md:block'>
            Moren Frago: Elevate your everyday. Discover quality products, trending styles, and unbeatable deals, all delivered with trusted service for a stress-free shopping experience.
          </p>
          <p className='text-sm leading-relaxed text-gray-300 md:hidden'>
            Fast. Easy. Reliable. Shopping
          </p>
          {/* Social Media Icons */}
          <div className='flex space-x-4 text-2xl mt-4'>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className='hover:text-[#e6b892] transition-colors'>
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className='hover:text-[#e6b892] transition-colors'>
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/morenfrago_india/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='hover:text-[#e6b892] transition-colors'>
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/your-youtube-channel" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className='hover:text-[#e6b892] transition-colors'>
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Column 2: Company Links */}
        <div className='flex flex-col items-start md:items-center'>
          <h3 className='text-xl md:text-2xl font-semibold mb-4 text-[#e6b892]'>COMPANY</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li><a href="/" className='hover:text-[#e6b892] transition-colors'>Home</a></li>
            <li><a href="/about" className='hover:text-[#e6b892] transition-colors'>About Us</a></li>
            <li><a href="/delivery" className='hover:text-[#e6b892] transition-colors'>Delivery</a></li> {/* Updated href */}
            <li><a href="/privacy-policy" className='hover:text-[#e6b892] transition-colors'>Privacy Policy</a></li>
            <li><a href="/terms" className='hover:text-[#e6b892] transition-colors'>Terms & Conditions</a></li> {/* Added new link */}
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className='flex flex-col items-start md:items-center'>
          <h3 className='text-xl md:text-2xl font-semibold mb-4 text-[#e6b892]'>CUSTOMER SERVICE</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li><a href="/faq" className='hover:text-[#e6b892] transition-colors'>FAQ</a></li>
            <li><a href="/returns" className='hover:text-[#e6b892] transition-colors'>Returns & Refunds</a></li>
            <li><a href="/shipping" className='hover:text-[#e6b892] transition-colors'>Shipping Info</a></li>
            <li><a href="/help-center" className='hover:text-[#e6b892] transition-colors'>Help Center</a></li>
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div className='flex flex-col items-start md:items-center'>
          <h3 className='text-xl md:text-2xl font-semibold mb-4 text-[#e6b892]'>GET IN TOUCH</h3>
          <ul className='space-y-3 text-sm text-gray-300'>
          
            <li>
              <a href="https://wa.me/919162350466" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 hover:text-[#e6b892] transition-colors'>
                <FaWhatsapp className='text-lg' /> WhatsApp: +91-9162350466
              </a>
            </li>
            <li>
              <a href="mailto:morenfrago@yahoo.com" className='flex items-center gap-2 hover:text-[#e6b892] transition-colors'>
                <MdEmail className='text-lg' /> Contact: morenfrago@yahoo.com
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/morenfrago_india/" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 hover:text-[#e6b892] transition-colors'>
                <FaInstagram className='text-lg' /> Instagram: @morenfrago_india
              </a>
            </li>
            <li>
              <a href="mailto:md.jamalk50@gmail.com" className='flex items-center gap-2 hover:text-[#e6b892] transition-colors'>
                <MdEmail className='text-lg' /> Admin: md.jamalk50@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Separator Line */}
      <div className='w-full h-[1px] bg-[#333333] my-8'></div>

      {/* Copyright Section */}
      <div className='w-full text-center text-sm text-gray-400'>
        <p>Copyright {new Date().getFullYear()}@morenfrago.com - All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;