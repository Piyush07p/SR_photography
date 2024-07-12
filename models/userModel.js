const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    is_admin:{
        type:Number,
        default:0        
    }
})

const userModel=mongoose.model('userSignup',userSchema)

module.exports=userModel;