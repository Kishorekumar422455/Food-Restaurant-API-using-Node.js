const categoryModels = require("../models/categoryModels");

//create category controller
const createCategoryController=async(req,res)=>{
    try
    {
        const{title,imageUrl}=req.body;
        if(!title)
        {
            res.status(404).send({
                success:false,
                message:"Please provide category title"
            });
        }
        const newCategory=new categoryModels({title,imageUrl});
        await newCategory.save();
        res.status(200).send({
            success:true,
            message:"Category created successfully",
            newCategory
        });
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"Error in create category API "
        });
    }
}

//Get all category
const getAllCategoryController=async(req,res)=>{
    try{
        const categories=await categoryModels.find({});
        if(!categories)
        {
            res.status(404).send({
                success:false,
                message:"Categories not found"
            });
        }
        res.status(200).send({
            success:true,
            totalCount:categories.length,
            categories
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all category API"
        });
    }
};

//Update category
const updateCategoryController=async(req,res)=>{
        try{
            const categoryId=req.params.id;
            const{title,imageUrl}=req.body;
            if(!categoryId)
            {
                res.status(400).send({
                    success:false,
                    message:"No category with this ID"
                });
            }
            await categoryModels.findByIdAndUpdate(categoryId,{title,imageUrl},{new:true});
            res.status(200).send({
                success:true,
                message:"Category updated successfully"
            });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update category API"
        });
    }
};

//Delete category
const deleteCategoryController=async(req,res)=>{
        try{
            const categoryId=req.params.id;
        if(!categoryId)
        {
            res.status(400).send({
                success:false,
                message:"please provide category ID "
            });
        }
        const categories=await categoryModels.findById(categoryId)
        if(!categories)
        {
              res.status(400).send({
                success:false,
                message:"No category found with this ID"
            });
        }
        await categoryModels.findByIdAndDelete(categories);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete category API"
        });
    }
};


module.exports={
    createCategoryController,
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController
};