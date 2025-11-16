const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, updateFoodController, deleteFoodController, getSingleFoodController, getFoodByRestaurantController } = require('../controllers/foodController');
const router=express.Router();

//create food
router.post('/createFood',authMiddleware, createFoodController);

//Get all food without authorization
router.get('/getAllFood',getAllFoodController);

//Get Single food
router.get('/getSingle/:id',getSingleFoodController );

//Get food restaurant by id
router.get('/getFoodRestaurant/:id',getFoodByRestaurantController);

//Update food
router.put('/updateFood/:id',updateFoodController);

//Delete food without authorization
router.delete('/deleteFood/:id' , deleteFoodController);

module.exports=router;