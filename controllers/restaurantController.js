const restaurantModels = require("../models/restaurantModels");


//Create restaurant
const createRestaurantController=async(req,res)=>{
    try{
        const{title,
            imageurl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coordinates}=req.body;
            //validation
            if(!title||!coordinates)
            {
                res.status(404).send({
                    success:false,
                    message:"Please provide title and address"
                });
            }
            const newRestaurant=new restaurantModels({title,
            imageurl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coordinates});

            await newRestaurant.save();
            res.status(201).send({
                success:true,
                message:"New Restaurant is created successfully",
                newRestaurant
            });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in restaurant API"
        });
    }
}

//Get all restaurant
const getAllRestaurantController=async(req,res)=>{
    try{
        const restaurant=await restaurantModels.find({});
        if(!restaurant)
        {
            res.status(404).send({
                success:false,
                message:"No restaurants available"
            });
        }
        res.status(200).send({
            success:true,
            totalCount:restaurant.length,
            restaurant
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all restaurants API"
        });
    }
}

//Get restaurant by ID
const getRestaurantByIdController=async(req,res)=>{
    try{
        const restaurantId=req.params.id;
        if(!restaurantId)
        {
            res.status(404).send({
                success:false,
                message:"Please provide restaurant ID"
            });
        }
        const restaurant=await restaurantModels.findById(restaurantId)
        if(!restaurant)
        {
             res.status(400).send({
            success:false,
            message:"No restaurant found"
        })
          
        }
          res.status(200).send({
                success:true,
                restaurant
            });
       
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"Error in get restaurant by id",
            error
        })
    }
} 

//Delete restaurant 
const deleteRestaurantController=async(req,res)=>{
    try{
        const restaurantId=req.params.id;
        if(!restaurantId)
        {
            res.status(404).send({
                success:false,
                message:"No restaurant found or provide id"
            });
        }
        await restaurantModels.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success:true,
            message:"Restaurant deleted successfully"
        });
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"Error in deleting restaurant API",
            error
        });
    }
}

module.exports={
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController
};