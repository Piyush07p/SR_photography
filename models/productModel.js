const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productName:{ 
        type:String,
    },
    price:{
        type:Number,
    },
    image:{
        type:String
    } 

   
})

const productModel=mongoose.model('product',productSchema)

module.exports=productModel;