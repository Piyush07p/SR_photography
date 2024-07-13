const userModel=require('../models/userModel');
const orderModel=require('../models/ordersModel')
const productModel=require('../models/productModel')
const imguploadModel=require('../models/imgUpload')

const getUsers=async(req,res)=>{
  try{
      const users=await userModel.find();
      res.status(200).json({
        userList:users
      })
  }catch(err){
    console.log(err)
  }
}
const removeUser=async(req,res)=>{
    try { 
        console.log(req.params.id)
        const users=await userModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({msg:"user deleted successfully"})
    } catch (error) {
        console.log(error)
    }
} 

//-------------------(orders)----------------

const generateOrder=async(req,res)=>{
   try {
        const { productname,quantity,name,phone, email, address}=req.body;
        const ordersData=await orderModel.create({
        productname,quantity,name,phone, email, address
      })
      res.status(200).json({
        msg:"order created successfully"
      })
   } catch (error) {
    console.log(error)
   }
}

const getOrderData=async (req,res)=>{
  try {
     const orderData=await orderModel.find();
    
     res.status(200).json({
      orderList:orderData
     })
  } catch (error) {
    console.log(error)
  }
}

const deleteOrder=async (req,res)=>{
  try {
    const orderDeleted=await orderModel.findByIdAndDelete({_id:req.params.id});
    
     res.status(200).json({
      msg:"order deleted"
     })
  } catch (error) {
    console.log(error)
    
  }
}

//-----------------------(add product)---------------------

const addProduct=async(req,res)=>{
  const {productName,price}=req.body;
   try {
       const prodImg=req.file.filename
       const addProduct=await productModel.create({
          productName,
          price,
          image:prodImg
       }) 
       console.log(addProduct)
       res.status(200).json({
        msg:"Product added successfully !!"
       })
   } catch (error) {
    console.log(error)
   }
}
const showProduct=async(req,res)=>{
   try {
       const data=await productModel.find();
       res.status(200).json({
        productList:data
       })
   } catch (error) {
    console.log(error)
   }
}
const deleteProduct=async(req,res)=>{
    try {
      const data=await productModel.deleteOne({_id:req.params.id});
      res.status(200).json({
          msg:"product deleted successfully"
      })
  } catch (error) {
  console.log(error)
  }
}
// ----------------------(upload inmages to gallery)---------------------
const uploadImages=async(req,res)=>{
   try {
       const Img=req.file.filename
       const uploadImg=await imguploadModel.create({
          images:Img
       }) 
       console.log(uploadImg)
       res.status(200).json({
        msg:"Image added successfully !!"
       })
   } catch (error) {
    console.log(error)
   }
}
const getUploadedImages=async(req,res)=>{
  try {
      const uploadedImg=await imguploadModel.find() 
      res.status(200).json({
       imgList:uploadedImg
      })
  } catch (error) {
   console.log(error)
  }
}

const deleteUploadedImg=async ( req,res)=>{
      try {
        const data=await imguploadModel.deleteOne({_id:req.params.id});
        res.status(200).json({
            msg:"Image deleted successfully"
        })
    } catch (error) {
    console.log(error)
    }
}


module.exports={
    getUsers,
    removeUser,
    generateOrder,
    getOrderData,
    deleteOrder,
    addProduct,
    showProduct,
    deleteProduct,
    uploadImages,
    getUploadedImages,
    deleteUploadedImg
}

