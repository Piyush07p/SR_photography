import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
 
    const [productName , setProductName]=useState('')
    const [price , setPrice]=useState('')
    const [image , setImage]=useState(null)
    const navigate=useNavigate()


    const handleProdNameInputs=(e)=>{
         setProductName(e.target.value)
    }
    const handlePriceInputs=(e)=>{
         setPrice(e.target.value)
    }
    const handleFileInputs=(e)=>{
       setImage(e.target.files[0]);
    }

    const uploadProduct=async(e)=>{
        e.preventDefault()

        const formData = new FormData();
        
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('image', image);
        console.log("--->>",formData)
         const resp=await fetch('/admin/product',{
            method:"POST",
            body:formData
         })
         const data=await resp.json();
         if(data){
            toast.success("Product added successfully",{
                position: 'top-right',
            }) 
         }
         setProductName('')
         setPrice('')
         setImage('')
    }

    //-----------(code for fetching the products)-----------------

    const [productData,setProductData]=useState([])
    const fetchProducts=async()=>{
      const resp=await fetch('/admin/product',{
        method:"GET"
      })
        if (resp.status === 401) {
            navigate('/login');
        }else if(resp.status===402){
            toast.warning("You do not have privilage to access this route",{
                position: 'top-right',
            })
            navigate('/profile')
        } else { 
            const data = await resp.json();
            setProductData(data.productList);
        }
  
    }
  
    
    const removeProduct=async(id)=>{
        const resp=await fetch(`/admin/product/${id}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json" 
            },
        })
        toast.success("Product deleted successfully",{
            position: 'top-right',
        })
    }

    useEffect(()=>{
        fetchProducts()
  },[removeProduct])

  return (
      <section>
     <h1 className='p-4 text-[2rem] text-center'>Welcome to Admin dashboard</h1>

        <div className='flex'>
            <Sidebar/>
            <ToastContainer/>
            <div className='m-2 w-[85vw]'>
                <h1 className='text-[2rem]   '>Add your product</h1>
               <main className='flex flex-wrap justify-center w-[100%]  py-2 border-2'>
               <form action="" encType='multipart/form-data ' className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[48%]'>
                    <div className='border-2 bg-gray-200 p-10 w-[100%]'>
                        <label>Product Name</label> <br />
                        <input required name='productName' value={productName} onChange={handleProdNameInputs} className='w-[80%] h-[2.2rem] border-black-100 border-2 px-2' placeholder='Enter product name' type='text'/><br /> <br />
                        <label htmlFor="">Price</label>  <br />
                        <input required name='price' value={price} onChange={handlePriceInputs}  className='w-[80%] h-[2.2rem] border-black-100 border-2 px-2' placeholder='Enter product price' type="text" /><br /><br />
                        <label htmlFor="">Upload image</label> <br /> <br />
                        <input  name='image' required  onChange={handleFileInputs}  type="file" /><br /> <br />
                        <button type='submit' className='bg-red-400 text-white px-4 py-1 rounded' onClick={uploadProduct}>Add</button>
                    </div>
                </form>
                <div action="" className='m-1 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] border-2 p-1 h-[24rem] overflow-y-scroll' >  
                    <div className=' grid grid-cols-4 gap-1 border-2 p-2 m-2'>
                        <span className='font-bold'>S.no.</span> 
                        <span className='font-bold'>Product</span>                   
                        <span className='font-bold'>Price</span>
                    </div>
                    {
                   
                        productData.map((elem,ind)=>{
                            return(
                                <>
                                  <div className=' grid grid-cols-4 gap-1 border p-2 m-2'>
                                       <span>{ind+1}</span> <span>{elem.productName}</span>
                                       <span>{elem.price}</span>
                                       <span>
                                        <button className='border bg-red-400 rounded px-2 text-white' onClick={()=>removeProduct(elem._id)}>Remove</button>
                                       </span>
                                   </div>
                                </>
                            )
                        })
                    }
                </div>
               </main>
            </div>
        </div>
      </section>
  )
}

export default AddProduct