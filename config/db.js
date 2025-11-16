const mongoose=require('mongoose');
const colors=require('colors');

//function to connected db
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_url);
        console.log(`Mongodb connected successfully`.white.bgMagenta);
    }
    catch(error)
    {
        console.log(`Mongodb connection failed`.white.bgRed);
    }
};

module.exports=connectDB;