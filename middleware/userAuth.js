const jwt=require('jsonwebtoken');

const isLogin=async(req,res,next)=>{
    try {
        if(req.cookies?.jwt_token==''){
            console.log("Please login first to access the page !!");
            return res.status(401).send("Unauthorized: No token provided");
        }
        jwt.verify(req.cookies.jwt_token,process.env.JWT_KEY,(err,decode)=>{
            if(err){
               console.log("token expired");
               return res.status(401).send("Unauthorized: No token provided");
            }
            
            req.currentUser=decode;
            if(!decode.isAdmin){
               return res.status(402).send("Not an admin")
             
            }
            next();
        });

    } catch (error) {
        console.log(error)
    }
}
 
const isAdmin=(req,res,next)=>{
    try {
        if(req.cookies?.jwt_token==''){
            console.log("Please login first to access the page !!");
            return res.status(401).send("Unauthorized: No token provided");
        }
        jwt.verify(req.cookies.jwt_token,process.env.JWT_KEY,(err,decode)=>{
            if(err){
               console.log("token expired");
               return res.status(401).send("Unauthorized: No token provided");
            }
            
            req.currentUser=decode;
            if(!decode.isAdmin){
               return res.status(402).send("Not an admin")
             
            }
            next();
        });

    } catch (error) {
        console.log(error)
    }
}

module.exports={isLogin,isAdmin}