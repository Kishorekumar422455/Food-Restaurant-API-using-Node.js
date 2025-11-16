const userModels = require("../models/userModels");
const bcrypt=require("bcryptjs");

//Get User Info
const getUserService=async(req,res)=>
{
    try
    {
        //find user
        const user=await userModels.findById({_id:req.body.id});
        if(!user)
        {
            res.status(404).send({
                success:false,
                message:"User not found",
                error
            });
        }
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"User data fetched successfully",
            user
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting user data",
            error
        });
    }
 
   
}

//Update user Info
const updateUserService=async(req,res)=>
{
    try{
        const user=await userModels.findById({_id:req.body.id});
        if(!user)
        {
            res.status(404).send({
                success:false,
                message:"User not found",
                error
            });
        }
        const {username,address,phone}=req.body;
        if(username) user.username=username;
        if(address) user.address=address;
        if(phone) user.phone=phone;

        //save user
        await user.save();
        res.status(200).send({
            success:true,
            message:"User data updated successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in updating user data",
            error
        });
    }
}

//Update password
const updatePasswordService=async(req,res)=>{
    try{
        const user=await userModels.findById({_id:req.body.id});
        if(!user)
        {
            res.status(404).send({
                success:false,
                message:"User not found"
            });
        }

        //check old password and new password
        const {oldPassword,newPassword}=req.body;
        if(!oldPassword||!newPassword)
        {
            res.status(500).send({
                success:false,
                message:"Please provide old or new password"
            });
        }
        //check user password||compare password
        const ismatch=await bcrypt.compare(oldPassword,user.password);
        if(!ismatch)
        {
                return res.status(500).send({
                success:false,
                message:"Invalid old password"
            });
        }
        //hashing password
        var salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password reset successfully"
        });

    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"Error in password update"
        });
    }
}

//Reset password
const resetPasswordService=async(req,res)=>{
    try{
        const {email,newPassword,answer}=req.body;
        if(!email||!newPassword||!answer)
        {
            return res.status(404).send({
                success:false,
                message:"Please Provide all fields"
            });
        }
        const user=await userModels.findOne({email,answer})
        if(!user)
        {
            return res.status(500).send({
                success:false,
                message:"User not found or invalid answer"
            });
        }
      //hashing password
          var salt=bcrypt.genSaltSync(10);
          const hashedPassword=await bcrypt.hash(newPassword,salt);
          user.password=hashedPassword;
          await user.save();
          res.status(200).send({
            success:true,
            message:"Password reset successfully"
          });
        }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in password reset",
            error
        });
    }
}

//Delete User
const DeleteUserService=async(req,res)=>{
    try{
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200).send({
        success:true,
        message:"User account deleted successfully"
    });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete user"
        });
    }

}

module.exports={
    getUserService,
    updateUserService,
    updatePasswordService,
    resetPasswordService,
    DeleteUserService
};