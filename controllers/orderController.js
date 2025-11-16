const orderModels = require("../models/orderModels");

//create order
const createOrderController=async(req,res)=>{
    try{
        const{cart}=req.body;
        if(!cart)
        {
            res.status(400).send({
                success:false,
                message:"Please provide cart values"
            });
        }
        let total=0;
        cart.map((i)=>{
            total+=i.price;
        });
        const newOrder=new orderModels({
            foods:cart,
            payments:total,
            buyer:req.body.id,
        });
        await newOrder.save();
        res.status(200).send({
            success:true,
            message:"Order placed successfully",
            newOrder
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in order API"
        });
    }
}

//order status
const orderStatusController=async(req,res)=>{
    try{
        const orderId=req.params.id;
        const {status}=req.body;
        if(!orderId)
        {
            res.status(400).send({
                success:false,
                message:"Please provide valid order Id"
            });
        }
        const orders=await orderModels.findByIdAndUpdate(orderId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:"Order status updated successfully",
            orders
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in order status API"
        });
    }
}

module.exports={createOrderController,orderStatusController};