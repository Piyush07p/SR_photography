import React, { useState } from 'react'
import '../css/About.scss'
import certData from "../Api/certy"
const About = () => {
  const [cert, setCert] = useState(certData)
  return (
      <section className='about_sec'>
            <h1>About us</h1>
            <div className='about_container'>
                <div className='about_para'>
                      <h1>Sr photographer</h1>
                      <p>
                      Hello! I'm [Your Name], a passionate photographer based in [Your Location]. I invite
                       you to explore my world of photography, where 
                      I strive to freeze moments in time, turning them into cherished memories.My Photographic Journey:
                      My fascination with photography began [mention when and why you started]. Over the years, 
                      I've cultivated my skills, transforming my love for the craft into a lifelong pursuit.
                      </p>
                </div>
                <div className='about_img'>
                    <img src="" alt="" />
                </div>

            </div>
            <main className='Certificates'>
                    <h1>Certificates</h1>
                    <div>
                    {
                      cert.map((e)=>{
                        return(
                          <>
                             <div>
                                  <img src="" alt="img" />
                             </div>
                          </>
                        )
                      })
                    }
                    </div>
            </main>
        

      </section>
  )
}

export default About