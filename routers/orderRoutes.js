const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware=require('../middlewares/adminMiddleware');
const { createOrderController, orderStatusController } = require('../controllers/orderController');
const router=express.Router();

//Create order
router.post('/createOrder',authMiddleware,createOrderController);

//Order status
router.post('/orderStatus/:id',authMiddleware,adminMiddleware,orderStatusController);


module.exports=router