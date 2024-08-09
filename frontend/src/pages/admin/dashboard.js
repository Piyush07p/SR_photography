import React, {useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {toast,Toaster} from 'react-hot-toast'
import Loader from '../../components/Loader';

const Dashboard = () => {
    const [userData,setUserData]=useState([]);
    const navigate=useNavigate()
    const [spinnerBtn,setSpinnerBtn]=useState(true)
    const fetchUser=async()=>{
        try {
            
            const resp=await fetch('/admin/dashboard',{
                method:"GET",
                headers:{
                    'Content-Type':"application/json"
                }
            })
            if (resp.status === 401) {
                navigate('/login');
            }else if(resp.status===402){
                // toast.warning("You do not have privilage to access this route",{
                //     position: 'top-right',
                // })
                navigate('/profile')
            }  else { 
                const data = await resp.json();
                setUserData(data.userList)
            }
           
           
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[userData])

    const removeUser=async(id)=>{ 
        
        try {
            setSpinnerBtn(false)
            const resp=await fetch(`http://localhost:5500/admin/dashboard/${id}`,{
                method:"DELETE",  
                headers:{
                    "Content-Type":"application/json" 
                },
                
            });
            const data=await resp.json()
            if(data){
                toast.success("User deleted !!")
                setSpinnerBtn(true)
           }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section className='w-full '>
         <h1 className='px-4 py-2 text-[1.7rem] sm:text-[2rem] text-center border-2'>Welcome to Admin dashboard</h1>
         <Toaster
           position="top-center"
           reverseOrder={true}
       />
         <div className='flex w-[100% ]   '>
            <Sidebar className=' '/>
             <main className='m-2 border w-[100%] sm:w-[80%]  bg-gray-300 flex flex-wrap'>
             
                {
                    userData.map((elem,ind)=>{
                        return(
                            <>
                             <div className='p-2 text-white rounded w-[10rem] text-[0.8rem] sm:text-[1rem] sm:w-[12rem]  h-[8rem] bg-gray-600 m-2   '>
                                <h2> {elem.name}</h2>
                                <p>{elem.email}</p>
                                <button className='bg-gray-800 p-1 rounded my-4 min-w-[5rem] ' onClick={()=>removeUser(elem._id)}>{spinnerBtn?"Remove":<Loader/>}</button>
                            </div>
                            </>
                        )
                    })
                }
                   
             </main>
         </div>
    </section>
  )
}

export default Dashboard