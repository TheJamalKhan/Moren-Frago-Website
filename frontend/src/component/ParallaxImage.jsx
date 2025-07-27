import React from 'react';
import { useInView } from 'react-intersection-observer';
import MorenImage from '../assets/Moren.webp';

const ParallaxImage = () => {
    // useInView for the fade-in effect of the text content
    const { ref, inView } = useInView({
        threshold: 0.5, // The text will appear when 50% of the component is visible
        triggerOnce: false,
    });

    return (
        <div
            ref={ref}
            // Responsive height for different screen sizes
            className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden z-0"
        >
            {/* Background Image Container
                - 'bg-fixed' is now applied universally to all screen sizes.
                - This ensures the background image is fixed on both mobile and desktop.
            */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${MorenImage})`,
                }}
            />

            {/* Gradient Overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

            {/* Center Content */}
            <div
                className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4 transition-opacity duration-300 ease-in-out ${
                    inView ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Responsive text and button sizes for a better mobile experience */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-2xl">Be the real MFs.</h2>
                <p className="mt-2 text-md sm:text-lg max-w-lg">Born from grit. Styled for legends.</p>
                <a
                    href="/collection"
                    className="mt-6 px-8 py-3 bg-white text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
                >
                    EXPLORE NOW
                </a>
            </div>
        </div>
    );
};

export default ParallaxImage;
