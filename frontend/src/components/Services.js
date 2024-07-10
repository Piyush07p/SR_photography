import React, { useState } from 'react'
import '../css/services.scss'
import serviceData from '../Api/service-data';
import { NavLink } from 'react-router-dom';
const Services = () => {

  const [serData, setserData] = useState(serviceData)
  return (
    <>
        <section className='service_sec'>
            <h1 className='text-[2rem]'>Our services</h1>
            <div className='services_div'>
                {
                  serviceData.map((e)=>{
                    return(
                      <>
                         <div className='service_card'>
                             <h3>{e.name}</h3>
                            <div className='services_img'>
                              <img src={require(`${e.link}`)} alt='img' />
                            </div>
                            <div>
                            <button>
                              <NavLink style={{textDecoration:"none", color: "#fff"}} to="/Booking">Book</NavLink>
                            </button>
                            </div>
                         </div>
                      </>
                    )
                  })
                }
            </div>
        </section>
    </>
  )
}

export default Services