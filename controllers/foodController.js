const foodModels = require("../models/foodModels");

//Create food controller
const createFoodController=async(req,res)=>{
    try{
        const{title,
            description,
            price,
            imageUrl,
            foodTags,
            restaurant,
            code,
            isAvailable,
            rating,
            ratingCount,
        }=req.body;
        if(!title||!description||!price||!restaurant)
        {
            res.status(404).send({
                success:false,
                message:"Please provide required credentials"
            });
        }
        const newFood=new foodModels({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            restaurant,
            code,
            isAvailable,
            rating,
            ratingCount,
        });
        await newFood.save();
        res.status(200).send({
            success:true,
            message:"Food created successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create food API"
        });
    }
};

//Get All Food
const getAllFoodController=async(req,res)=>{
    try{
        const food=await foodModels.find();
        if(!food)
        {
            res.status(404).send({
                success:false,
                message:"No foods found"
            });
        }
        res.status(200).send({
            success:true,
            totalCount:food.length,
            food
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all food API"
        });
    }
};

//Get Single food
const getSingleFoodController=async(req,res)=>{
    try{
        const foodId=req.params.id;
        if(!foodId)
        {
            res.status(400).send({
                success:false,
                message:"Please provide food Id"
            });
        }
        const food=await foodModels.findById(foodId);
        res.status(200).send({
            success:true,
            message:"Food is found successfully",
            food
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"Error in get single food API"
        });
    }
}

//Get food by restaurant
const getFoodByRestaurantController=async(req,res)=>{
    try{
        const restaurantId=req.params.id;
        if(!restaurantId)
        {
            res.status(400).send({
                success:false,
                message:"Please provide restaurant id"
            });
        }
        const food=await foodModels.find({restaurant:restaurantId})
        if(!food)
        {
            res.status(404).send({
                success:false,
                message:"No food is found with this restaurant"
            });
        }
        res.status(200).send({
            success:true,
            totalCount:food.length,
            food
        });
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"Error in get food restaurant API"
        });
    }
}


//Update food
const updateFoodController=async(req,res)=>{
        try{
            const foodId=req.params.id;
            if(!foodId)
            {
                res.status(400).send({
                    success:false,
                    message:"No food is found with this id"
                });
            }
            const {title,
            description,
            price,
            imageUrl,
            foodTags,
            restaurant,
            code,
            isAvailable,
            rating,
            ratingCount,}=req.body;
            const food=await foodModels.findByIdAndUpdate(foodId,{title,
            description,
            price,
            imageUrl,
            foodTags,
            restaurant,
            code,
            isAvailable,
            rating,
            ratingCount,},{new:true});
            res.status(200).send({
                success:true,
                message:"Food is updated successfully",
                food
            });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update food API"
        });
    }
};

//Delete food
const deleteFoodController=async(req,res)=>{
        try{
            const foodId=req.params.id;
            if(!foodId)
            {
                res.status(400).send({
                    success:false,
                    message:"Please provide food Id"
                });
            }
            const food=await foodModels.findById(foodId);
            if(!food)
            {
                res.status(400).send({
                    success:false,
                    message:"No food is found with this id"
                });
            }
            await foodModels.findByIdAndDelete(foodId);
            res.status(200).send({
                success:true,
                message:"Food is deleted successfully"
            });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete food API"
        });
    }
};


module.exports={
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController
};