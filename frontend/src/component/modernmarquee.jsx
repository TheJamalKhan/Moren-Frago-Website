import React from 'react';

const ModernMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-black py-2">
      <div className="animate-marquee text-white text-lg md:text-xl font-semibold inline-block">
        <span className="mx-10">
          📦 Moren Frago Exclusive – 🧢 Moren Frago – 🔥 Be the Real MFs
        </span>
        <span className="mx-10">
          📦 Moren Frago Exclusive – 🧢 Moren Frago – 🔥 Be the Real MFs
        </span>
        <span className="mx-10">
          📦 Moren Frago Exclusive – 🧢 Moren Frago – 🔥 Be the Real MFs
        </span>
      </div>
    </div>
  );
};

export default ModernMarquee;
