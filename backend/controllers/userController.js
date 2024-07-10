const userModel=require('../models/userModel');
const  bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userRegister=async(req,res)=>{
    try {
        const {name,phone,email,password}=req.body;
        console.log(req.body)
        if(!name || !phone ||! email ||!password){
            return res.json({msg:"something went wrong, fill all the details"})
        }
        const hashedPass=await bcrypt.hash(password,12)
        console.log(hashedPass)
        const userData=await userModel.create({
            name:name,
            phone:phone,
            email:email,
            password:hashedPass
        })
        res.status(200).json({
            msg:"user Registered successfully !!"
        })
    } catch (error) {
        console.log(error)
    }
}

const userLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userData=await userModel.findOne({email:email});
        if(!userData){
            return res.json({
                msg:"Provide  correct credentials !!",
                status:0
            })
        }
        const pass=await bcrypt.compare(password,userData.password)
        if(!pass){

             return res.json({
                msg:"Login with correct credentials !!",
                status:0
            });
        }
        let token=jwt.sign({
            userId:userData._id,
            name:userData.name,
            isAdmin:userData.is_admin
          },
         process.env.JWT_KEY
        )
        res.cookie('jwt_token',token)

        res.status(200).json({
            msg:"user logged in successfully !!",
            status:1,
            is_admin:userData.is_admin,
            userName:userData.name
        })
    } catch (error) {
        console.log(error);
    }
}

const userLogout=async(req,res)=>{
  try {
    
    res.cookie('jwt_token', '');
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error.message)
  }
}
module.exports={userRegister,userLogin,userLogout}