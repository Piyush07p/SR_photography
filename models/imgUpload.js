const mongoose=require('mongoose');

const imgUploadSchema=new mongoose.Schema({
    images:{ 
        type:String,
    },
   
})

const imguploadModel=mongoose.model('imgUpload',imgUploadSchema)

module.exports=imguploadModel;