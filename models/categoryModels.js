const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Category title is required"]
    },
    imageUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd20W8Lhn6wMGxPRFNabFqZDP0VQJ9J6sPEg&s"
    }

},{timestamps:true});

//exports
module.exports=mongoose.model("Category",categorySchema);