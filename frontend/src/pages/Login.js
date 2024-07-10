import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink,useNavigate,useLocation} from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Login = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const [userData,setUserData]=useState({
      email:"",
      password:""
  })
  const userLoginFunc= async(e)=>{
     try {
       const {email,password}=userData;
        if(!email||!password){
            
        }

       const resp=await fetch('/userAuth/login',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,password
          })
       })
       let data=await resp.json()
       console.log(data)
       if (data.status==0) {
          toast.error("Invalid login",{
              position: 'top-right',
          })
          return
      } else {
          toast.success("You are logged in successfully",{
              position: 'top-right',
          })
          
      }
      localStorage.setItem('userName',JSON.stringify(data.userName))
      localStorage.setItem('isAdmin',JSON.stringify(data.is_admin))

      if(data.is_admin==1){
        navigate('/admin/dashboard')
      }
      else{
          const from = location.state?.from?.pathname || '/';
          navigate(from);
      }
     
      

      
     } catch (error) {
       console.log(error)
     }
      setUserData({
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

  const [togglePass,setTogglePass]=useState(true)
  return (
    <section className='w-full h-[100%] flex justify-center py-[20] border bg-gray-300' >
    <ToastContainer/>
      <div className=' m-2'>
          <h1 className='text-[2rem] pl-3'>Login here...</h1>
          <div className='flex justify-between flex-col p-3 relative'>
              <label htmlFor="">Email</label>
              <input className='border-1 w-[17rem] sm:w-[20rem] h-[2.5rem] px-2' placeholder='enter email' onChange={handleInputs} name='email' type="text" /> <br /> <br />
              <label htmlFor="" >Password</label>
              <input type={(togglePass)?"password":"text"} className='border-1 w-[17rem] sm:w-[20rem] h-[2.5rem] px-2' placeholder='enter password' onChange={handleInputs} name='password'  />
              {
                (togglePass)?<FaRegEyeSlash className='absolute right-[-1rem] bottom-[7.4rem] cursor-pointer' onClick={()=>setTogglePass(prev=>!prev)} />
                :
                <MdOutlineRemoveRedEye className='absolute right-[-1rem] bottom-[7.4rem] cursor-pointer' onClick={()=>setTogglePass(prev=>!prev)}/>
              }
              <button onClick={userLoginFunc} className=' h-[3] py-3 my-6 bg-gray-700 text-white '>Login</button>
          </div>
          <p className='m-2'>Create account: <NavLink to='/signup' className='underline'>Signup</NavLink></p>

      </div>
  </section>
  )
}

export default Login