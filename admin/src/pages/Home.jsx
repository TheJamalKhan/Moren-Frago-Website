import React from 'react'
import Nav from '../component/Nav'; // Adjust path if Nav.jsx is in a different folder
import Sidebar from '../component/Sidebar';
function Home() {
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-[white] relative'>
     <Nav/>
     <Sidebar/>
    </div>
  )
}

export default Home
