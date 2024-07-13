import React, { useRef, useState } from 'react'
import '../css/header.scss'
import {NavLink} from "react-router-dom";
import {RxHamburgerMenu} from "react-icons/rx"
import { RxCross2 } from "react-icons/rx";

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
                     <img width="40rem" height='40rem' src={require('./images/srlogo2.png')} alt='logo'/>
                    </NavLink>
                 </div>
                 <ul ref={hamUl} className='text-[0.9rem]'>
                    <NavLink className='navlink' onClick={navbarVis}  to="/">Home</NavLink>
                    <NavLink className='navlink' onClick={navbarVis}  to="/Services">Services</NavLink>
                    <NavLink className='navlink' onClick={navbarVis}  to="/Gallery">Gallery</NavLink>
                    {/* <NavLink className='navlink'  to="/About">About</NavLink> */}
                    <NavLink className='navlink' onClick={navbarVis}  to="/Contact">Contact</NavLink>
                    {
                         (JSON.parse(localStorage.getItem('userName')))?
                          (<p>
                              <NavLink onClick={navbarVis} to={JSON.parse(localStorage.getItem("isAdmin"))?'/admin/dashboard':'/profile'}className=' text-[1rem]  border-2 rounded p-1  border-red-400'>{(JSON.parse(localStorage.getItem('userName')))}</NavLink>
                              <NavLink  onClick={navbarVis}  to='/logout'><button className='mx-3 bg-red-400 p-1 text-white rounded'>Logout</button></NavLink>
                              <br/>
                          </p>
                         )
                         :<p>
                              <NavLink className='login' onClick={navbarVis}  to="/login"><button className='border-2 border-red-400 py-1 px-2 rounded mx-2'>Login</button></NavLink>
                              <NavLink className='signup' onClick={navbarVis}  to="/signup"><button className='bg-red-400 py-1 px-2 rounded text-white'>Signup</button></NavLink>
                         </p>
                    }
                  </ul>
                  <p ref={hamB}  className='hamBur'>
                     {
                         (flag)?<RxHamburgerMenu onClick={navbarVis}/>
                         :<RxCross2 onClick={navbarVis}/>
                     }
                  </p>
            </nav>
       </>
  )
}

export default Header;