import React, { useEffect, useRef, useState } from 'react'
import '../css/home.scss'
import { NavLink } from 'react-router-dom'
import workData from "../Api/work"
import serviceData from "../Api/service-data"
import printData from "../Api/printing";
import { GraphyContext} from "../Context/ProdContext"
import {useContext} from "react";
import Loader from './Loader'

const Home = () => {
  const {prodname,setprodName,prodPrice,setprodPrice,prodImg,setprodImg}=useContext(GraphyContext);
  const [wData, setwData] = useState(workData)
  const [serData, setserData] = useState(serviceData)
  const [prinData, setprinData] = useState(printData)
  const [flag, setflag] = useState(true)
  const expDiv = useRef("")
  const [visible,setVisible]=useState(4)
  const expandDiv = () => {
    
      setVisible(prev=>prev+4)
      // setflag(!flag)
  }
  const setItem=(elem)=>{
      setprodName(elem.productName)
      setprodPrice(elem.price)
      setprodImg(elem.image)
      console.log(prodImg)  
  }
const [productData,setProductData]=useState([])
  const fetchProduct=async()=>{
    const resp=await fetch('/admin/product',{
      method:"GET"
    })
    const data=await resp.json();
    console.log(data)
    setProductData(data.productList);

  }

 useEffect(()=>{
      fetchProduct()
 },[])
  return (
    <>
      <section className='home_sec'>
        <div className='slider_div'>
          <div>
            <img className='img' width=" 30rem" src={require("./images/home2.JPG")} alt="" />
            <img className='img' width=" 30rem" src={require("./images/home1.JPG")} alt="" />
            <img className='img' width=" 30rem" src={require("./images/home3.JPG")} alt="" />
            <img className='img' width=" 30rem" src={require("./images/home4.JPG")} alt="" />

          </div>
        </div>

        {/* --------------(( ))--------------- */}
        <section className='detailSec'>
           <h1 className='branh1'>Sr Photography</h1>
          
        <div className="detail_div">
          
          {/* <div className='home_img'>

            <div>
              <img src={require("./images/intro_img2.jpg")} alt="img" />
            </div>
          </div> */}

          <div className='home_about'>
            <div>
            <h1> <span style={{ color: "red" }}>S</span>r Photography</h1>
            <h3>Shankar Studio</h3>
            <br/>
            <p>"Hello, I'm RISHABH PATEL, a professional photographer with 6 years of
               experience capturing moments and memories that last a lifetime. With a
                keen eye for detail and a passion for creating beautiful images, I've
                 been honored to win numerous local awards. I specialize in family portraiture 
                 and child photography, wedding photography, fashion photography and many more and 
                 my goal is to give families the gift of memories that will bring smiles to their faces 
                 for years to come.
            </p>
            </div>
          </div>
        </div>
        </section>
        {/* ----------------------------(end)----------------------------- */}

        {/* -----------------------(book_us)---------------------------- */}

        {/* <div className='book_us_div'>
          <div>
            <h1>Book us Now</h1>
            <h3>We do what you demand on time and affordable price</h3>
            <button>
              <NavLink className='book-btn' style={{ fontWeight: "600", textDecoration: "none" }} to="/Services">Book Now</NavLink>
            </button>
          </div>
        </div> */}

        {/* ----------------------------(end)------------------------------- */}

        {/* ----------------------------(work)--------------------------------- */}
        <div className="work">
          <h1 className='text-[2rem]'>Our Highlights</h1>
          <div   className='bg-gray-300'>

            {
              wData.map((e) => {
                return (
                  <>
                    <div className='img_container'>
                      <img src={require(`${e.link}`)} alt="" />
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
        {/* ---------------------(end)---------------------------- */}

        {/* -------------------(services)------------------------ */}
        <div className='home_service'>
          <h1 className='text-[2rem]'>Service Pricing</h1>
          <div  className='bg-gray-300'>
            {
              serData.map((e) => {
                return (
                  <>
                    <div>
                      <h1>{e.name}</h1>
                      <h3>{e.price}</h3>
                      <button className='bg-gray-700'>
                        <NavLink style={{ textDecoration: "none" }} to="/Booking">BOOK</NavLink>
                      </button>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>

     
        <div className="printItem">
          <h1 className='text-[2rem]'>Sublimation Printing</h1>
          {/* <div ref={expDiv} >
            {
              prinData.map((e) => {
                return (
                  <>
                    <div>
                      <h1>{e.name}</h1>
                      <img src={require(`${e.img}`)} alt="" />
                      <h3>Rs. {e.buy}</h3>
                      <button >
                        <NavLink onClick={()=>setItem(e)} style={{ color: "#fff", textDecoration: "none" }} to="/Product">
                          Buy
                        </NavLink>
                      </button>
                    </div>
                  </>
                )
              })
            }
           
          </div> */}
            <div ref={expDiv} className='bg-gray-300'>
                  {
                    productData.slice(0,visible).map((elem) => {
                      return (
                        <>
                          <div>
                            <h1 className='font-bold'>{elem.productName}</h1>
                            <img src={`./uploads/${elem.image}`} alt="" />
                            <h3>Rs. {elem.price}</h3>
                            
                              <NavLink onClick={()=>setItem(elem)}  to="/Product">
                                <button  className='bg-gray-600 text-white w-[12rem] hover:bg-gray-700 rounded p-1' >
                                  Buy
                                </button>
                              </NavLink>
                          </div>
                        </>
                      )
                    })
                  }
            </div>
          <main className='expandBtn'>
            <button onClick={expandDiv}>{(flag) ? "See More" : "See Less"}</button>
          </main>
        </div>
    
       
      </section>
    </>
  )
}

export default Home