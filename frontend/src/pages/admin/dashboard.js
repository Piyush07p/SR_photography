import React, {useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userData,setUserData]=useState([]);
    const navigate=useNavigate()
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
            const resp=await fetch(`http://localhost:5500/admin/dashboard/${id}`,{
                method:"DELETE",  
                headers:{
                    "Content-Type":"application/json" 
                },
                
            });
            const data=await resp.json()
        //     if(data){
        //         toast.success("User deleted !!",{
        //           position: 'top-right',
        //      })
        //    }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section className='w-full relative'>
         <h1 className='p-4 text-[2rem] text-center'>Welcome to Admin dashboard</h1>
         {/* <ToastContainer/> */}
         <div className='flex w-[100% ] '>
            <Sidebar className='absolute top-1 '/>
             <main className='m-2 border w-[80%]   bg-gray-300 flex flex-wrap'>
                {
                    userData.map((elem,ind)=>{
                        return(
                            <>
                             <div className='p-2 text-white rounded w-[12rem]  h-[8rem] bg-gray-600 m-2  '>
                                <h2> {elem.name}</h2>
                                <p>{elem.email}</p>
                                <button className='bg-gray-800 p-1 rounded my-4 ' onClick={()=>removeUser(elem._id)}>Remove</button>
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