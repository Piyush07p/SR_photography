import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";




const Sidebar = () => {
  const [toggleClass,setToggleClass]=useState(true)
  return (
    <div className={`${toggleClass?"fixed  left-[-12rem] top-[-0.5rem]":"fixed  left-[-1rem] top-[-0.5rem]"} z-1 sm:static`}>
        <aside className='m-2 px-4  border bg-gray-300 h-[100vh] relative'>
                <ul>
                    {
                      (toggleClass)? <RxHamburgerMenu className={`${!toggleClass?"absolute  right-[0rem] top-[0.2rem]":"fixed  left-[1rem] top-[5rem]"} sm:hidden   text-[1.2rem] `} onClick={()=>setToggleClass(prev=>!prev)}/>:
                       <RxCross2 className={`${!toggleClass?"absolute  right-[0rem] top-[0.2rem]":"fixed  left-[1rem] top-[5rem]"} sm:hidden   text-[1.2rem] `} onClick={()=>setToggleClass(prev=>!prev)}/>
                    }
                    <NavLink   to='/admin/dashboard'><li className='mt-5 flex bg-gray-400 px-2 py-1 rounded text-white'><FaUser className='mr-2'/>Users</li></NavLink>
                    <NavLink  to='/admin/upload'><li className='mt-5 flex bg-gray-400 px-2 py-1 rounded text-white'><MdFileUpload className='mr-2'/>Upload images</li></NavLink>
                    <NavLink to='/admin/orders' ><li className='mt-5 flex bg-gray-400 px-2 py-1 rounded text-white'><FaAddressBook className='mr-2'/>Orders</li></NavLink>
                    <NavLink  to='/admin/addproduct'> <li className='mt-5 flex bg-gray-400 px-2 py-1 rounded text-white'><MdProductionQuantityLimits className='mr-2'/>Add product</li></NavLink>
                </ul>
            </aside>
    </div>
  )
}

export default Sidebar