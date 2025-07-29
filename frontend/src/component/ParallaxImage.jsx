import React from 'react';
import { useInView } from 'react-intersection-observer';
import MorenImage from '../assets/Moren.webp';

const ParallaxImage = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });

    return (
        <div ref={ref} className="relative w-full h-screen overflow-hidden z-0">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
                style={{
                    backgroundImage: `url(${MorenImage})`,
                }}
            />

            {/* Gradient Overlay for text clarity */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 pointer-events-none -z-0" />

            {/* Foreground Content */}
            <div
                className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-opacity duration-500 ease-in-out ${
                    inView ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-[90%] md:max-w-2xl leading-tight">
                    Be the real MFs.
                </h2>
                <p className="mt-3 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
                    Born from grit. Styled for legends.
                </p>
                <a
                    href="/collection"
                    className="mt-6 px-6 py-3 text-sm sm:text-base bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
                >
                    EXPLORE NOW
                </a>
            </div>
        </div>
    );
};

export default ParallaxImage;