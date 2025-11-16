const express=require('express');
const{ createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController }=require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();

//Create restaurant
router.post('/createRestaurant',authMiddleware, createRestaurantController);

//Get all restaurants
router.get('/getAll',getAllRestaurantController);

//Get restaurant by id
router.get('/get/:id',getRestaurantByIdController);

//Delete restaurant by id without authorization token
router.delete('/deleteRestaurant/:id',deleteRestaurantController);

//export
module.exports=router;