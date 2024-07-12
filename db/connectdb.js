const mongoose=require('mongoose');

const connectDB=async(mongo_url)=>{
  try{
    const DB_option={
        dbname:"srdatabase"

    }
    await mongoose.connect(mongo_url,DB_option)

    console.log("database connected successfully !!");
  }catch(err){
    console.log(err)
  }
}


module.exports={connectDB};