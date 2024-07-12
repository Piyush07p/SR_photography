const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    productname:{ 
        type:String,
    },
    quantity:{
        type:Number,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true, 
    },
    address:{
        type:String,
        required:true
    }
   
})

const orderModel=mongoose.model('order',orderSchema)

module.exports=orderModel;