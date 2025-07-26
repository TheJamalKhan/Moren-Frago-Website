import React from 'react'
import { useState } from 'react';
import Backgound from '../component/Backgound';
import Hero from '../component/Hero';
import { useEffect } from 'react';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';
function Home() {
  let heroData = [
    {
      text1: "Welcome to Moren Frago.",
      text2: "Enjoy 30% Off Your First Order."
    },
    {
      text1: "Exclusive Drops.",
      text2: "Own It Before It's Gone."
    },
    {
      text1: "Style, Elevated.",
      text2: "Discover the New Wave."
    },
    {
      text1: "Define Your Look.",
      text2: "The Latest Collection is Here."
    }
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
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>
    </div>
  )
}

export default Home