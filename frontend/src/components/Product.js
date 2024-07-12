import React, { useRef, useState } from 'react'
import { GraphyContext} from "../Context/ProdContext"
import {useContext} from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import '../css/Product.scss'
const Product = () => {

const {prodname,prodPrice,prodImg}=useContext(GraphyContext);

const quantt = useRef("")
const priceRef = useRef("")

const [quantVal, setqunatVal] = useState(1)
const [quantPrice, setqunatPrice] = useState(prodPrice)

const popUp = useRef("")
const showPopup=(e)=>{
       if(quantVal>0){
        if(e) popUp.current.style.top="2rem" ;
       }
       if(!e) popUp.current.style.top="-10rem"
}
const Counter=(e)=>{
  console.log(prodImg)
   if(e){
    setqunatVal(quantVal+1)
    setqunatPrice(quantPrice+prodPrice)
   }
   if(!e){
     if(quantPrice>0){
        setqunatVal(quantVal-1)
        setqunatPrice(quantPrice-prodPrice)
     }

   }
}

const [productData,setProductData]=useState({
  productname:prodname,
  quantity:1,
  name:"",
  phone:"",
  email:"",
  address:""
})
    let name=''
    let value=''
    const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setProductData({...productData,[name]:value})
    }

    const createOrder=async(e)=>{
      e.preventDefault();
      const { productname,quantity,name,phone,email,address}=productData;
      const resp=await fetch('/admin/orders',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          productname,
          quantity:quantVal,
          name,
          phone,
          email,
          address
        })
      })
      const data=await resp.json();
      // if(data){
      //   toast.success("your order successfully created !!",{
      //     position: 'top-right',
      // })
      // }
      setProductData({
        productname:prodname,
        quantity:1,
        name:"",
        phone:"",
        email:"",
        address:""
      })
    }

  return (
       <section className='Product_sec'>
        {/* <ToastContainer/> */}
              {/* <main>
                    <div ref={popUp}>
                        <h3>Product purchased successfully</h3>
                        <button  onClick={()=>showPopup(false)}>OK</button>
                    </div>
              </main> */}
                <div>
                    <div className='prod_img'>
                          <img src={`./uploads/${prodImg}`} alt="" />
                    </div>
                    <div className='prod_desc'>
                         <h1 className='text-[1.5rem] font-bold'>{prodname}</h1>
                         <p>
                           Enter the detail below to get your product delivery on time
                         </p>
                         <h3 className='font-bold'>Rs.<h3 ref={priceRef}>{quantPrice}</h3></h3>
                         <div className='quant_detail'>
                            <span onClick={()=>Counter(false)}>-</span>
                            <span ref={quantt}>{quantVal}</span>
                            <span onClick={()=>Counter(true)}>+</span>
                         </div>

                        <div className='buy_detail'>
                         <form action='' method='POST'>
                           <input style={{display:"none"}}  name="quantity"  /> 
                           <input onChange={handleInputs} value={productData.productname} style={{display:"none"}} name="productname"  /> 
                            <label  required htmlFor="">Enter name</label>
                            <input name='name' value={productData.name} onChange={handleInputs} required placeholder='your name' type="text" /> <br />
                            <label  required  htmlFor="">Enter mobile no.</label>
                            <input name='phone' value={productData.phone} onChange={handleInputs} required placeholder='your phone' type="text" /> <br />
                            <label required htmlFor="">Enter email</label>
                            <input name='email' value={productData.email} onChange={handleInputs}  placeholder='your email' type="text" /><br />
                            <label required htmlFor="">Enter Address</label>
                            <input name='address' value={productData.address} onChange={handleInputs}  required placeholder='your address' type="text" />
                            <button className=' w-[10rem]' onClick={createOrder}>Buy</button>
                           </form>
                         </div>

                        
                    </div>
                </div>
       </section>
  )
}

export default Product