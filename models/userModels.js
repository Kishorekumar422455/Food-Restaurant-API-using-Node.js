const mongoose=require('mongoose');


//schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true, "user Name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,"phone number is required"]
    },
    usertype:{
        type:String,
        required:[true,"user type is required"],
        default:"client",
        enum:["admin","client","restaurantOwner","deliveryBoy","vendor","driver"]
    },
    profile:{
        type:String,
        default:"https://img.icons8.com/?size=1200&id=tZuAOUGm9AuS&format=jpg"
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},
{
    timestamps:true
}
);

//exporting model
module.exports=mongoose.model('User',userSchema);