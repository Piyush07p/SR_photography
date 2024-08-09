import React, { useEffect,useState } from 'react'
import Sidebar from '../../components/Sidebar'
import {toast,Toaster} from 'react-hot-toast'

import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const Orders = () => {
  const [orderData,setOrderData]=useState([])
  const navigate=useNavigate()
  const [spinnerBtn,setSpinnerBtn]=useState(true)

  const fetchOrder=async()=>{
   
    let resp=await fetch('/admin/orders',{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    })
      if (resp.status === 401) {
          navigate('/login');
      }else if(resp.status===402){
        toast.warning("You do not have privilage to access this route")
       
        navigate('/profile')
      }  else { 
          const data = await resp.json();
          setOrderData(data.orderList)
      }
    
  }
  const deleteOrder=async(id)=>{
    try {
      setSpinnerBtn(false)
       let resp=await fetch(`/admin/orders/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
    })
    const data=await resp.json();
    if(data){
      toast.success("Order deleted successfully !!")
      setSpinnerBtn(true)
    }
    } catch (error) {
      console.log(error)
    }
  }
    const acceptOrder=()=>{
      
    }
  useEffect(()=>{
     fetchOrder()
  },[deleteOrder])
  return (
    <section>
     <h1 className='p-4 text-[1.7rem] sm:text-[2rem] align-center text-center'>Welcome to Admin dashboard</h1>

         <div className='flex w-full'>
             <Sidebar/>
             <Toaster
                    position="top-center"
                    reverseOrder={true}
              />
             <div className='w-[100%] sm:w-[80%] rounded'>
                 <h1 className='text-[1.5rem] sm:text-[2rem] text-center underline'>Order List </h1>
                 <div className='flex mx-2 py-4 justify-between'>
                    <span className=' text-red-600'>Pending orders: {orderData?.length}</span>
                    <span className=' text-green-600'>Completed orders: 0</span>
                 </div>
                      {
                        
                        orderData.map((elem,ind)=>{
                          return(
                            <>
                               <div className='w-[100%] py-2 bg-gray-200 sm:text-[1rem] text-[0.8rem] rounded mx-1 sm:mx-2 my-4'>
                                  <div className='flex px-4 bg-gray-300 h-[2rem]  w-[100%] justify-between'> 
                                    <p>{elem.productname}</p>
                                    <p>Quantity: {elem.quantity}</p>
                                    
                                  </div>
                                  <div className='grid sm:text-[1rem] text-[0.7rem] grid-cols-4 gap-4 mt-2  px-2'>
                                      <p>{elem.name}</p>
                                      <p>{elem.phone}</p>
                                      <p className='break-words'>{elem.email}</p>
                                      <p>{elem.address}</p>
                                  </div>
                                  <div className='sm:text-[1rem] text-[0.75rem] px-4 mt-4'>
                                    <button className='px-2 py-1 h-[3] bg-gray-600 text-white rounded ' onClick={acceptOrder}>Accept</button>
                                    <button className=' px-2 py-1 h-[3] mx-2 bg-red-400 text-white rounded cursor-pointer min-w-[5rem]' onClick={()=>deleteOrder(elem._id)}>{spinnerBtn?"Remove":<Loader/>}</button>
                                  </div>
                              </div>
                            </>
                          ) 
                        })
                      }
                
             </div>
         </div>
    </section>
  )
}

export default Orders