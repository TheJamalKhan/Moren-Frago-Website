import React, { useState } from 'react';

function NewLetterBox() {
  const [email, setEmail] = useState(''); // State to store the email input value
  const [message, setMessage] = useState(''); // State for success/error messages
  const [showEmoji, setShowEmoji] = useState(false); // State to control emoji display

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)

    if (!email) {
      setMessage('Please enter your email address.');
      setShowEmoji(false); // Hide emoji if validation fails
      return;
    }

    // --- Frontend-only logic for success ---
    setMessage('Hurray! 🎉 You\'re subscribed!'); // Set success message
    setShowEmoji(true); // Show emoji
    setEmail(''); // Clear the input field
    // You can optionally hide the message after a few seconds
    setTimeout(() => {
      setMessage('');
      setShowEmoji(false);
    }, 5000); // Message disappears after 5 seconds
    // --- End Frontend-only logic ---
  };

  return (
    <div className='w-full py-16 md:py-20 flex flex-col items-center justify-center bg-[#e8cbb3] text-[#141414] text-center px-4'>

      <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 px-4 max-w-4xl'>
        Subscribe now & get 20% off
      </h2>

      <p className='text-sm md:text-base lg:text-lg text-gray-700 font-medium mb-8 px-4 max-w-3xl'>
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      <form onSubmit={handleSubmit} className='w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 max-w-xl px-4'>
        {/* Email Input Field */}
        <input
          type="email" // Changed to type="email" for better validation
          placeholder='Enter Your Email'
          value={email} // Bind input value to state
          onChange={(e) => setEmail(e.target.value)} // Update state on change
          className='
            w-full sm:w-2/3 md:w-auto flex-grow h-12 px-5 rounded-lg
            bg-white/80 backdrop-blur-sm
            text-gray-800 placeholder-gray-500
            border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent
            shadow-md transition-all duration-200 ease-in-out
          '
          required
        />
        {/* Subscribe Button */}
        <button
          type='submit'
          className='
            w-full sm:w-auto px-8 py-3 rounded-lg
            bg-[#d97706] text-white font-semibold text-base md:text-lg
            shadow-md cursor-pointer
            hover:bg-[#c26c05] transition-colors duration-300 ease-in-out
            flex items-center justify-center
          '
        >
          Subscribe
        </button>
      </form>

      {/* Display success/error message */}
      {message && (
        <p className={`mt-4 text-sm md:text-base ${showEmoji ? 'text-green-700 font-semibold' : 'text-red-700'}`}>
          {message} {showEmoji ? '🎉' : ''}
        </p>
      )}

    </div>
  );
}

export default NewLetterBox;