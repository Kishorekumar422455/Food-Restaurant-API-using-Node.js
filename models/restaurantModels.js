const mongoose=require('mongoose');


//schema
const restaurantSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Restautant title is required"]
    },
    imageurl:{
        type:String,
        default:''
    },
    foods:{
        type:Array
    },
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    code:{
        type:String
    },
    coordinates:{
        id:{type:String},
        latitude:{type:Number},
        longititude:{type:Number},
        latitudeDelta:{type:Number},
        longititudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    },
},
{timestamps:true}
);

//exporting model
module.exports=mongoose.model('Restaurant',restaurantSchema);