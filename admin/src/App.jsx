import React, { useContext } from 'react'
import Add from './pages/Add.jsx'
import Home from './pages/Home.jsx'
import Lists from './pages/Lists.jsx'
import Order from './pages/Order.jsx'
import Login from './pages/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import { adminDataContext } from './context/AdminContext.jsx'

function App() {
  let {adminData} = useContext(adminDataContext)
    return (
    <>
      {!adminData ? <Login/> : <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/add' element={<Add/>} />
            <Route path='/lists' element={<Lists/>} />
            <Route path='/orders' element={<Order/>} />
            <Route path='/login' element={<Login/>} />
        </Routes> </>}
    </>
  )
}

export default App
