import React from 'react'
import Header from './components/header.js'
import Home from './components/home.js'
import Services from './components/Services.js'
import About from './components/About.js'
import Contact from './components/Contact.js'
import Gallery from './components/Gallery.js'
import Booking from './components/Booking.js'
import Product from './components/Product.js'
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import Upload from './pages/admin/upload.js'
//----------------(admin page)----------------
import Dashboard from './pages/admin/dashboard.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer.js'
import './App.css'

import { useRef ,useState,useEffect} from 'react'
import AddProduct from './pages/admin/addProduct.js'
import Orders from './pages/admin/orders.js'
import Logout from './pages/Logout.js'
import Profile from './pages/Profile.js'
import ProtectedRoute from './pages/ProtectedRoute.js'
import PrivateRoute from './pages/Privateroute.js'

const App = () => {
const [mousePosition,setMousePosition]=useState({x:0,y:0})
let moveDot1=useRef('')
let moveDot2=useRef('')

function updateMousePos(e){
  setMousePosition({x:e.clientX,y:e.clientY})
  // moveDot1.current.style.left=mousePosition.x+"px"
  // moveDot1.current.style.top=mousePosition.y+"px"
  moveDot2.current.style.left=mousePosition.x+"px"
  moveDot2.current.style.top=mousePosition.y+"px"
}
useEffect((e)=>{
  window.addEventListener("mousemove",updateMousePos)
  return ()=>{
    document.removeEventListener("mousemove",updateMousePos)
  }
},[mousePosition])
  return (
    <>
      <Header/>
       <h1 ref={moveDot1}  className='movingDot1'></h1>
       <p ref={moveDot2} className='movingDot2'></p>
          <Routes>

            <Route  path={'/'} element={<Home/>}/>
            <Route  path={'/Services'} element={<Services/>}/>
            <Route  path={'/Gallery'} element={<Gallery/>}/>
            <Route  path={'/Gallery'} element={<Gallery/>}/>
            {/* <Route  path={'/About'} element={<About/>}/> */}
            <Route  path={'/Contact'} element={<Contact/>}/>
         
          
            <Route  path={'/signup'} element={<Signup/>}/>
            <Route  path={'/login'} element={<Login/>}/>
            <Route  path={'/logout'} element={<Logout/>}/>
            <Route  path={'/profile'} element={<Profile/>}/>

            {/* ----------------(protected route)------------------ */}

            <Route element={<ProtectedRoute />}>
                  <Route  path={'/Product'} element={<Product/>}/>
                  <Route  path={'/Booking'} element={<Booking/>}/>
            </Route>

            <Route element={<PrivateRoute/>}>
                <Route  path={'/admin/addProduct'} element={<AddProduct/>}/>
            </Route>

            {/* -----------------(admin dash)-------------------- */}
            <Route  path={'/admin/dashboard'} element={<Dashboard/>}/>
            <Route  path={'/admin/upload'} element={<Upload/>}/>
            <Route  path={'/admin/orders'} element={<Orders/>}/>
            


          </Routes>
          
      <Footer/>
    </>
  )
}

export default App
