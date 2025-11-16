const userModels = require("../models/userModels");
const bcrypt=require('bcryptjs');
const JWT=require('jsonwebtoken');

//registration service
const registrationService =async(req,res) =>{
 try{
    const {username,email,password,phone,address,answer}=req.body;

    //valifdation
    if(!username|| !email||!password||!phone||!answer)
    {
        return res.status(500).send({
            success:false,
            message:"Please Provide all required fields"
        });
    }

    //check user
    const existing=await userModels.findOne({email});
    if(existing){
        return res.status(500).send({
            success:false,
            message:"Email already Registered please Login"
        });
    }

    //hashing password
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hashSync(password,salt);

    //create new user
    const user=await userModels.create({
        username,
        email,
        password:hashedPassword,
        phone,
        address,
        answer
    });
    res.status(201).send({
        success:true,
        message:"User Registered Successfully",
        user
    });
 }
 catch(error)
 {
    console.error('Error in Registration Service', error);
    res.status(500).send({
        success:false,
        message:'Error in Registration Service',
        error:error.message
    })
 }
};


//login
const loginService = async(req,res)=>{
 try
    {
    const {email,password}=req.body;

    //validation
    if(!email||!password)
    {
        return res.status(500).send({
            success:false,
            message:"Please provide Email or Password"
        });
    }
    //check user
    const user=await userModels.findOne({email:email})
    if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found or Password mismatch"
            });

        }
        //check user password||compare password
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch)
        {
            return res.status(500).send({
                success:false,
                message:"Invalid credentials"
            });
        }
        //token
        const token=JWT.sign({id:user._id},process.env.JWT_Secret,
            {expiresIn:'7d'}
        );
        user.password=undefined;
            res.status(200).send({
                success:true,
                message:"Login Successfully",
                token,
                user
            })
     }
 catch(error)
 {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in Login API",
        error:error.message
    });
 }
};

module.exports={registrationService,loginService};