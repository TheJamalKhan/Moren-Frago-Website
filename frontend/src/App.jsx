// src/App.jsx
import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'; // Corrected: Added Navigate
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Collections from './pages/Collections.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './component/Nav.jsx';
import { userDataContext } from './context/UserContext.jsx';


function App() {
  const location = useLocation();
  const {userData} = useContext(userDataContext)
  return (
    <>
      <ToastContainer />
      {userData && <Nav/>}

      <Routes>
       <Route path='/login'
       element={userData ? (<Navigate to={location.state?.from || "/"}/> )
       : (<Login/>)
         }/>

       <Route path='/signup'
       element={userData ? (<Navigate to={location.state?.from || "/"}/> )
       : (<Registration/>)}/>

       <Route path='/'
       element={userData ? <Home/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

       <Route path='/about'
       element={userData ? <About/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

       <Route path='/collection'
       element={userData ? <Collections/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

       <Route path='/product'
       element={userData ? <Product/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

       <Route path='/contact'
       element={userData ? <Contact/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
      </Routes>
    </>
  );
}

export default App;