const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');
const router=express.Router();

//create category
router.post('/createCategory',authMiddleware,createCategoryController);

//Get all category without authorization
router.get('/getAllCategory',getAllCategoryController);

//Update category
router.put('/updateCategory/:id',authMiddleware,updateCategoryController);

//Delete category without authorization
router.delete('/deleteCategory/:id', deleteCategoryController);

module.exports=router;