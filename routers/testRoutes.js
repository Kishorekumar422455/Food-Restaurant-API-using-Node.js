const express=require('express');
const { testUserController } = require('../controllers/testController');

//Router object
const router=express.Router();

//Router Get|Post|Update|Delete
router.get('/test-User',testUserController);



//export router
module.exports=router;