const express=require('express')
const adminroute=express.Router(); 
const multer=require('multer')
const {getUsers,removeUser,generateOrder,getOrderData,deleteOrder,
    addProduct,showProduct,deleteProduct,uploadImages,getUploadedImages}=require('../controllers/admindash')
    
const {isLogin}=require('../middleware/userAuth') 
const path=require('path')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
            return cb(null,"public/uploads");
    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload=multer({storage})


adminroute.get('/dashboard',isLogin,getUsers)
adminroute.delete('/dashboard/:id',removeUser)

adminroute.post('/orders',generateOrder)
adminroute.get('/orders',isLogin,getOrderData)
adminroute.delete('/orders/:id',deleteOrder)

adminroute.post('/product',upload.single('image'),addProduct)
adminroute.get('/product',showProduct)
adminroute.delete('/product/:id',deleteProduct)

adminroute.post('/uploads',upload.single('uploadImg'),uploadImages)
adminroute.get('/uploads',getUploadedImages)







module.exports=adminroute