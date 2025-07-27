import React from 'react';
// Icons that build trust and confidence
import { LuShieldCheck, LuStar, LuTruck, LuBadgeCheck } from "react-icons/lu";

const TrustMarquee = () => {
  // --- UPDATED: Changed 15-day returns to 7-day returns ---
  const trustMessages = [
    "MOREN FRAGO: A BRAND YOU CAN TRUST",
    "100% SECURE PAYMENTS GUARANTEED",
    "FAST & RELIABLE SHIPPING NATIONWIDE",
    "EASY 7-DAY RETURNS ON ALL ORDERS",
    "AUTHENTIC MOREN FRAGO QUALITY ✨",
  ];

  return (
    <>
      <style>
        {`
          .trust-marquee-container {
            width: 100%;
            overflow: hidden;
            background-color: #f3f4f6; 
            color: #1f2937; 
            padding: 10px 0;
            white-space: nowrap;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
          }

          .trust-marquee-content {
            display: inline-block;
            animation: scroll-left-trust 30s linear infinite; 
          }
          
          .trust-marquee-container:hover .trust-marquee-content {
            animation-play-state: paused;
          }

          .trust-marquee-content span {
            font-size: 13px;
            font-weight: 500;
            text-transform: uppercase; /* Making text uppercase for a bolder look */
            letter-spacing: 0.5px; /* Adding some letter spacing */
            margin: 0 2.5rem; /* Increased spacing */
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
          }

          @keyframes scroll-left-trust {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%); 
            }
          }

          @media (max-width: 768px) {
            .trust-marquee-content span {
              font-size: 11px;
              margin: 0 1.5rem;
            }
            .trust-marquee-content {
              animation-duration: 25s; 
            }
          }
        `}
      </style>

      <div className="trust-marquee-container">
        <div className="trust-marquee-content">
          {/* Render the list twice for a seamless loop */}
          {[...trustMessages, ...trustMessages].map((message, index) => (
            <span key={`trust-${index}`}>
              {/* Using a verified badge icon for a stronger trust signal */}
              <LuBadgeCheck style={{ color: '#16a34a' }} /> 
              {message}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrustMarquee;
