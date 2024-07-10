
require('dotenv').config();
const express=require('express')
const {connectDB}=require('./db/connectdb')
const userRouter=require('./routes/userRoutes')
const app=express();
const cors=require('cors');
const path=require('path')
const cookieParser=require('cookie-parser')


const adminroute = require('./routes/adminRoute');

//middleware;

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());
 
app.use('/userAuth',userRouter)
app.use('/admin',adminroute)


app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"../frontend/build/index.html"),
        (err)=>{
            res.status(500).send(err);
        }
    );
})
// database connection-->
const db_url=process.env.MONGO_URL;
connectDB(db_url);

app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`);
})


