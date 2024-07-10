import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Logout = () => {
    const logoutUser=async()=>{
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
        const resp=await fetch('/userAuth/logout',{
            method:"GET",

        })
        
    }
   useEffect(()=>{
    logoutUser();
    
   },[logoutUser])

   return <Navigate to="/login"/>
}

export default Logout