import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";



const Sidebar = () => {
  return (
    <div>
        <aside className='m-2 px-4  border bg-gray-300 h-[80vh]'>
                <ul>
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