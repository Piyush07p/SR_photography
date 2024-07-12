import React, { useEffect,useState } from 'react'
import Sidebar from '../../components/Sidebar'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
  const [orderData,setOrderData]=useState([])
  const navigate=useNavigate()
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
        // toast.warning("You do not have privilage to access this route",{
        //     position: 'top-right',
        // })
        navigate('/profile')
      }  else { 
          const data = await resp.json();
          setOrderData(data.orderList)
      }
    
  }
  const deleteOrder=async(id)=>{
    try {
       let resp=await fetch(`/admin/orders/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
    })
    const data=await resp.json();
    if(data){
      // toast.success("Order deletedd successfully !!",{
      //   position: 'top-right',
      // })
    }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
     fetchOrder()
  },[deleteOrder])
  return (
    <section>
     <h1 className='p-4 text-[2rem] align-center text-center'>Welcome to Admin dashboard</h1>

         <div className='flex w-full'>
             <Sidebar/>
             {/* <ToastContainer/> */}
             <div className='w-[80%] rounded'>
                 <h1 className='text-[2rem]'>Order List</h1>
                 
                      {
                        orderData.map((elem,ind)=>{
                          return(
                            <>
                               <div className='w-[100%] bg-gray-200 h-[8rem] rounded mx-2 my-4'>
                                  <div className='flex px-4 bg-gray-300 h-[2rem]  w-[100%] justify-between'> 
                                    <p>{elem.productname}</p>
                                    <p>Quantity: {elem.quantity}</p>
                                    
                                  </div>
                                  <div className='grid grid-cols-4 grid-gap-4 mt-2 justify-between px-4'>
                                      <p>{elem.name}</p>
                                      <p>{elem.phone}</p>
                                      <p>{elem.email}</p>
                                      <p>{elem.address}</p>
                                  </div>
                                  <div className='px-4 mt-4'>
                                    <button className='px-2 py-1 h-[3] bg-gray-600 text-white rounded'>Accept</button>
                                    <button className=' px-2 py-1 h-[3] mx-2 bg-red-400 text-white rounded cursor-pointer' onClick={()=>deleteOrder(elem._id)}>Remove</button>
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