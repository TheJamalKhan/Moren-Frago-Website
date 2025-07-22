import React from 'react';
import Title from '../component/Title';
import aboutImage from '../assets/about_hero.jpg';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
  const navigate = useNavigate();

  const handleExploreCollectionsClick = () => {
    navigate('/collection');
  };

  // Define the reasons for "Why Choose Us" directly in AboutPage
  const whyChooseUsReasons = [
    {
      title: "Quality Assurance",
      description: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always."
    },
    {
      title: "Convenience",
      description: "Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place."
    },
    {
      title: "Exceptional Customer Service",
      description: "Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time."
    }
  ];

  return (
    // Main container for the entire About Us page, including all sections
    // This div will act as the single top-level element returned by the component
    <div className='w-full'>

      {/* Section 1: About Us Hero (Light Gradient Background) */}
      <div className='min-h-screen py-20 bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-black '>
        <div className='max-w-6xl mx-auto px-4 '>

          {/* About Us Title */}
          <div className='mb-10'>
            <Title text1={"ABOUT"} text2={"US"} />
          </div>

          {/* Main Content Section: Responsive Grid for Image and Text */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center'>

            {/* Left Column: Image with Overlay */}
            <div className='relative w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl '>
              <img
                src={aboutImage}
                alt="Moren Frago Collection"
                className='w-full h-full object-cover object-center'
              />
              {/* Image Overlay Content */}
              <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center'>
                <p className='text-3xl md:text-4xl font-bold mb-2 text-[#e6b892]'>MOREN FRAGO</p>
                <p className='text-lg md:text-xl font-medium mb-4'>Fashion, Comfort & Quality</p>
                <div className='text-base md:text-lg italic px-4'>
                  "Experience smart, seamless shopping."
                </div>
                <button
                  onClick={handleExploreCollectionsClick}
                  className='mt-6 px-6 py-2 bg-[#d97706] text-white font-semibold rounded-lg hover:bg-[#c26c05] transition-colors shadow-md'>
                  Explore Collections
                </button>
              </div>
            </div>

            {/* Right Column: About Us Text Content */}
            <div className='text-base md:text-lg space-y-6 lg:pl-8'>
              <p className='leading-relaxed'>
                Moren Frago is born for smart, seamless shopping—created to deliver quality products,
                trending styles, and everyday essentials like **stylish bottles and functional daily gears**, all in one convenient place. With reliable service, fast delivery,
                and great value, Moren Frago makes your online shopping experience simple, satisfying,
                and stress-free.
              </p>
              <p className='leading-relaxed'>
                We empower modern shoppers—combining style, convenience, and affordability. Whether it's
                fashion apparel, essential daily gears like **bottles**, or the latest trends, we bring everything you need to one trusted platform
                with fast delivery, easy returns, and a customer-first shopping experience you'll love.
              </p>

              <h3 className='text-2xl md:text-3xl font-bold text-[#e6b892] mt-8'>Our Mission</h3>
              <p className='leading-relaxed'>
                Our mission is to redefine online shopping by delivering quality, affordability, and
                convenience. Moren Frago connects customers with trusted products and brands, offering a
                seamless customer-focused experience that saves time, adds value, and fits every
                lifestyle and need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Why Choose Us (Dark Background) */}
      <div className='w-full bg-[#141414] py-16 md:py-20 lg:py-24 text-white '>
        <div className='max-w-6xl mx-auto px-4'>

          {/* Section Title */}
          <div className='mb-12 md:mb-16 '>
            <Title text1={"WHY"} text2={"CHOOSE US"} /> {/* Reusing your Title component */}
          </div>

          {/* Reasons Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
            {whyChooseUsReasons.map((reason, index) => (
              <div
                key={index}
                className='
                  p-6 rounded-lg border-2 border-gray-700 text-center
                  transition-all duration-300 ease-in-out
                  hover:border-[#e6b892] hover:shadow-lg hover:scale-[1.02]
                '
              >
                <h3 className='text-xl md:text-2xl font-semibold mb-3 text-[#e6b892]'>
                  {reason.title}
                </h3>
                <p className='text-base text-gray-400 leading-relaxed'>
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div> // End of main container
  );
}

export default AboutPage;