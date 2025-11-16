const express=require('express');
const { getUserService, updateUserService, updatePasswordService, resetPasswordService, DeleteUserService } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();

//Get user info
router.get('/GetUser', authMiddleware ,getUserService);

//Update user Info
router.put('/UpdateUser',authMiddleware,updateUserService);

//Update password 
router.post('/UpdatePassword',authMiddleware,updatePasswordService);

//Reset password
router.post('/ResetPassword',authMiddleware,resetPasswordService);

//Delete User
router.delete('/DeleteUser/:id',DeleteUserService); 

//export
module.exports=router;