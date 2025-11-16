const mongoose=require('mongoose');

const foodSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Food title is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    price:{
        type:Number,
        required:[true,'Food price is required']
    },
    imageUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd20W8Lhn6wMGxPRFNabFqZDP0VQJ9J6sPEg&s"
    },
    foodTags:{
        type:String,
    },
    code:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },

},{timestamps:true});


//exporting model
module.exports=mongoose.model('Food',foodSchema);