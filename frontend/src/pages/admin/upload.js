import React ,{useEffect, useState}from 'react'
import Sidebar from '../../components/Sidebar';
import {toast,Toaster} from 'react-hot-toast'

import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const Upload =() => {
     
       const [image , setImage]=useState(null);
       const navigate=useNavigate();
       const [spinnerBtn,setSpinnerbtn]=useState(true)
       const handleFileInputs=(e)=>{
          setImage(e.target.files[0]);
       }
       const uploadImgdata=async(e)=>{
            e.preventDefault()
            const formData = new FormData();
            formData.append('uploadImg', image);
            setSpinnerbtn(false)
               try {
                  const resp=await fetch('/admin/uploads',{
                      method:"POST",
                      body:formData
                  })
              const data=null
              if (resp.status === 401) {
                  navigate('/login');
              } else { 
                   data = await resp.json();
              }
              
                toast.success("Image uploaded successfully !!")
                setSpinnerbtn(true)
                alert("helo")
              
            
          } catch (error) {
            console.log(error)
          }
       }
       const [fetchedImg,setFetchedImg]=useState([]);
       const fetchImageData=async()=>{
          try {
              const resp=await fetch("/admin/uploads",{
                method:"GET"
              })
              const data=await resp.json()
              setFetchedImg(data.imgList)
              console.log(data.imgList)
          } catch (error) {
            console.log(error)
          }
       }

       //-------------(fetching_images)------------

       const deleteImgFunc=async (id)=>{
          try {
             const resp=await fetch(`/admin/uploads/${id}`,{
              method:"DELETE"
             })
             toast.success("Image deleted successfully !!")
          } catch (error) {
             console.log(error)
          }
       }
       useEffect(()=>{
           fetchImageData();
       },[deleteImgFunc])

  return (
   <section className=' border w-full'>
     <h1 className='p-4 text-[1.6rem] sm:text-[2rem] text-center'>Welcome to Admin dashboard</h1>
        <div className='flex '>
          <Sidebar/>
            <Toaster
                 position="top-center"
                 reverseOrder={true}
            />
            <div className='w-[100%] lg:flex-nowrap   flex flex-wrap'>
            <div className='sm:m-2 w-[100%] sm:w-[90%] lg:w-[30%] p-4 bg-gray-200 rounded'>
                <h1 className='text-[1.5rem] sm:text-[2rem]'>Upload images to Gallery</h1>
                    <form encType='multipar/form-data'>
                         <br/>
                         <input required name='uploadImg' onChange={handleFileInputs} type='file' /> <br/> <br/>
                         <button className='bg-red-400 px-2 py-1 rounded text-white min-w-[5rem]' onClick={uploadImgdata}>{(spinnerBtn)?"Upload":<Loader/>}</button>
                    </form>
            </div>
            <div className='sm:m-2 w-[100%] h-[100vh] mt-2 sm:w-[90%] lg:w-[70%] p-4 bg-gray-200 overflow-scroll rounded'>
                {
                  fetchedImg.map((elem)=>{
                    return(
                      <>
                         <div className='p-2 grid grid-cols-[3fr_2fr_1fr] text-[0.8rem] sm:text-[1rem] gap-4 border-2 rounded border-red-400 m-1 '>
                           <p>{elem.images}</p>
                           <img width='35rem' src={`.././uploads/${elem.images}`} alt="image" />
                           <button className='bg-red-400 w-[4rem] text-white p-1 h-[2rem] rounded' onClick={()=>deleteImgFunc(elem._id)}>Remove</button>
                          </div>
                      </>
                    )
                  })
                }
            </div>
            </div>
        </div>
   </section>
  )
}

export default Upload