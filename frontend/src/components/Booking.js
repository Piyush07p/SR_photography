import React, { useState } from 'react'
import bookData from '../Api/bookApi'
import '../css/Booking.scss'
import { NavLink } from 'react-router-dom'
const Booking = () => {

  const [bookDatas, setbookDatas] = useState(bookData)
  return (
    <>
        <section className='Book_sec'>
              <h1 className='text-[2rem]'>Book Now</h1>
              <>
                {
                  bookDatas.map((e)=>{
                    return(
                         <>
                            <div className='bookDetail '>
                              <h2 className='text-[2rem]'>{e.head}</h2>
                              <div>
                                <h4>{e.para}</h4>
                                 <NavLink to="/Contact">
                                   <button className='bg-gray-400 text-white'>Contact</button>
                                 </NavLink>
                              </div>
                            </div>
                         </>
                    )
                  })
                }
             </>

        </section>
    </>
  )
}

export default Booking