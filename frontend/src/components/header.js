import React, { useRef, useState } from 'react'
import '../css/header.scss'
import {NavLink} from "react-router-dom";
import {RxHamburgerMenu} from "react-icons/rx"

const Header = () => {
     const hamUl= useRef("")
     const hamB = useRef("")
     const [flag, setflag] = useState(true)
     const navbarVis=()=>{
         if({flag}) hamUl.current.style.display="flex";
         if(!flag)hamUl.current.style.display="none";
          setflag(!flag)
     
     }

  return (
       <>
            <nav className='nav_bar'>
                 <div className="logo">
                    
                    <NavLink className='navlink'  to="/">
                     <img width="40rem" src={require('./images/srlogo2.png')} alt='logo'/>
                    </NavLink>
                 </div>
                 <ul ref={hamUl} className='text-[0.9rem]'>
                    <NavLink className='navlink'  to="/">Home</NavLink>
                    <NavLink className='navlink'  to="/Services">Services</NavLink>
                    <NavLink className='navlink'  to="/Gallery">Gallery</NavLink>
                    {/* <NavLink className='navlink'  to="/About">About</NavLink> */}
                    <NavLink className='navlink'  to="/Contact">Contact</NavLink>
                    {
                         (JSON.parse(localStorage.getItem('userName')))?
                          (<p>
                              <NavLink to={JSON.parse(localStorage.getItem("isAdmin"))?'/admin/dashboard':'/profile'}className=' text-[1.2rem] underline'>{(JSON.parse(localStorage.getItem('userName')))}</NavLink>
                              <NavLink to='/logout'><button className='mx-3 bg-red-400 p-1 text-white rounded'>Logout</button></NavLink>
                              <br/>
                          </p>
                         )
                         :<p>
                              <NavLink className='login '  to="/login"><button className='border-2 border-red-400 py-1 px-2 rounded mx-2'>Login</button></NavLink>
                              <NavLink className='signup '  to="/signup"><button className='bg-red-400 py-1 px-2 rounded text-white'>Signup</button></NavLink>
                         </p>
                    }
                  </ul>
                  <p ref={hamB} onClick={navbarVis} className='hamBur'>
                     <RxHamburgerMenu/>
                  </p>
            </nav>
       </>
  )
}

export default Header;