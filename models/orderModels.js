const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
    }],
    payments:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Preparing","Packing","On the way","Delivery"],
        default:"Preparing"
    }

},{timestamps:true});

module.exports=mongoose.model('Order',orderSchema);