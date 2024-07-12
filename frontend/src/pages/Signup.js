import React from 'react'
import { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { NavLink,useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate=useNavigate()
    const [userData,setUserData]=useState({
        name:"",
        phone:"",
        email:"",
        password:""
    })
    const userRegisterFunc= async(e)=>{
       try {
         const {name,phone,email,password}=userData;
          if(!name||!phone||!email||!password){

          }

         const resp=await fetch('/userAuth/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,phone,email,password
            })
         })
         let data=await resp.json()

        //  if (!data) {
        //     toast.error("Invalid registration",{
        //         position: 'top-right',
        //     })
        

        // } else {
        //     toast.success("you are registered successfully",{
        //         position: 'top-right',
        //     })
            
        // }
        navigate('/login')

        
       } catch (error) {
         console.log(error)
       }
        setUserData({
            name:"",
            phone:"",
            email:"",
            password:""
        })
    }
    let name=''
    let value=''
    const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value
        setUserData({...userData,[name]:value})
    }
  return (
      <section className='w-full h-[100%] flex justify-center py-[20] border bg-gray-300' >
        {/* <ToastContainer/> */}
          <div className=''>
              <h1 className='text-[2rem] pl-3'>Register here...</h1>
              <div className='flex justify-between flex-col p-3'>
                  <label htmlFor="">Name</label>
                  <input className='border-1  sm:w-[20rem] h-[2.5rem] h-[2.5rem] px-2' placeholder='enter name' onChange={handleInputs} name='name' type="" /> <br /> <br />
                  <label htmlFor="">Phone</label>
                  <input className='border-1  sm:w-[20rem] h-[2.5rem] h-[2.5rem] px-2' placeholder='enter phone' onChange={handleInputs} name='phone' type="text" /> <br /> <br />
                  <label htmlFor="">Email</label>
                  <input className='border-1  sm:w-[20rem] h-[2.5rem] h-[2.5rem] px-2' placeholder='enter email' onChange={handleInputs} name='email' type="text" /> <br /> <br />
                  <label htmlFor="" >Password</label>
                  <input type="password" className='border-1 w-[17rem] sm:w-[20rem]  h-[2.5rem] px-2' placeholder='enter password' onChange={handleInputs} name='password'  />
                  <button onClick={userRegisterFunc} className=' h-[3] py-3 my-6 bg-gray-700 text-white '>Register</button>
              </div>
              <p className='m-2'>Already have an account? <NavLink to='/login' className="underline">Login</NavLink></p>
          </div>
      </section>
  )
}

export default Signup