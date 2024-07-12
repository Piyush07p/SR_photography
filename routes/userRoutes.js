const express=require('express');
const userRouter=express.Router();
const {userRegister,userLogin,userLogout}=require('../controllers/userController')
const {isLogin}=require('../middleware/userAuth')

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.get('/logout',userLogout)
module.exports=userRouter;
