const express=require('express');
const { registrationService, loginService } = require('../controllers/authController');

const router=express.Router();

//route and Register|Post
router.post('/register',registrationService)

//route login
router.post('/login',loginService)

//export
module.exports=router;