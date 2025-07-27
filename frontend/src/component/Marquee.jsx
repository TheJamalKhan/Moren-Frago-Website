import React from 'react';
// Using a more dynamic icon to match the high-energy theme
import { LuZap, LuFlame, LuRocket } from "react-icons/lu"; 

const Marquee = () => {
  // More attractive and urgent offer texts with emojis
  const offers = [
    "⚡ FLASH SALE! DON'T MISS OUT! ⚡",
    "🚀 FREE & FAST DELIVERY ON ALL ORDERS OVER ₹999 🚀",
    "🔥 HUGE SAVINGS! FLAT ₹500 OFF ON ORDERS ₹4999+ 🔥",
    "✨ LIMITED TIME OFFER: GET ₹200 OFF ON ORDERS ₹1999+ ✨",
  ];

  return (
    <>
      {/* This style block contains the updated CSS animation.
        It's included directly here so the component is self-contained.
      */}
      <style>
        {`
          .marquee-container {
            width: 100%;
            overflow: hidden; /* Hides the overflowing content */
            background-color: #1a1a1a; /* Dark background for contrast */
            color: #f0f0f0; /* Light text color */
            padding: 12px 0;
            white-space: nowrap; /* Prevents the text from wrapping */
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            cursor: pointer; /* Indicates it's interactive */
          }

          .marquee-content {
            display: inline-block;
            /* Apply the faster animation */
            animation: scroll-left 15s linear infinite; 
          }
          
          /* ADDED: Pause animation on hover for better UX */
          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }

          .marquee-content span {
            font-size: 14px;
            font-weight: 600; /* Bolder font for more impact */
            text-transform: uppercase; /* ALL CAPS for urgency */
            margin: 0 2.5rem; /* A bit more spacing */
            display: inline-flex;
            align-items: center;
            gap: 0.75rem; /* More space between icon and text */
          }

          /* The animation keyframes */
          @keyframes scroll-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              /* Scrolls exactly one full copy of the content */
              transform: translateX(-50%); 
            }
          }

          /* Media query for smaller screens */
          @media (max-width: 768px) {
            .marquee-content span {
              font-size: 12px;
              margin: 0 1.5rem;
            }
            .marquee-content {
              /* Scroll even faster on mobile to grab attention */
              animation-duration: 12s; 
            }
          }
        `}
      </style>

      <div className="marquee-container" title="Pause on hover to read offers">
        <div className="marquee-content">
          {/* We render the list twice for a seamless infinite loop */}
          {[...offers, ...offers].map((offer, index) => (
            <span key={`offer-${index}`}>
                {/* Dynamically choose an icon or keep one for consistency */}
                <LuZap style={{ color: '#f59e0b' }} /> 
                {offer}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Marquee;