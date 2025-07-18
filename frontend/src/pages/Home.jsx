import React from 'react'
import { useState } from 'react';
import Backgound from '../component/Backgound';
import Hero from '../component/Hero';
import { useEffect } from 'react';
import Product from './Product';
function Home() {
  let heroData = [
    
      {text1: "30% OFF on your first purchase",
      text2: "Style that",}

    ,{text1: "Streetwear for the modern you",
      text2: "Limited stocks",}
      
    ,{text1: "Elevate your style",
      text2: "Discover the latest trends",}

    ,{text1: "Unleash your style",
      text2: "Shop the latest collection",}
  ]
  let [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
  let interval = setInterval(() => {
    setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
  }, 3000)
  return () => clearInterval(interval)
}, [])
  return (
    <div className='overflow-x-hidden relative top-[70px]'>
    <div className='w-screen lg:h-screen md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from[#141414] to[#0a0c0]'>
       <Backgound heroCount={heroCount} />
       <Hero
       heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
        />
    </div>
    <Product/>
    </div>
  )
}

export default Home