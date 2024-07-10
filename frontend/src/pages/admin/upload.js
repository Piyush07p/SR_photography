import React ,{useState}from 'react'
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Upload =() => {
     
       const [image , setImage]=useState(null);
       const navigate=useNavigate();
       const handleFileInputs=(e)=>{
          setImage(e.target.files[0]);
       }
       const uploadImgdata=async(e)=>{
            e.preventDefault()
            const formData = new FormData();
            formData.append('uploadImg', image);
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
              if(data){
                toast.success("Image uploaded successfully !!",{
                  position: 'top-center',
                })
              }

          } catch (error) {
            console.log(error)
          }
       }

  return (
   <section>
     <h1 className='p-4 text-[2rem] text-center'>Welcome to Admin dashboard</h1>
        <div className='flex'>
          <Sidebar/>
          <ToastContainer/>         
            <div className='m-2'>
                <h1 className='text-[2rem]'>Upload images to Gallery</h1>
                    <form encType='multipar/form-data'>
                         <br/>
                         <input required name='uploadImg' onChange={handleFileInputs} type='file' /> <br/> <br/>
                         <button className='bg-red-400 px-2 py-1 rounded text-white' onClick={uploadImgdata}>Upload</button>
                    </form>
            </div>
        </div>
   </section>
  )
}

export default Upload