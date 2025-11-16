const JWT=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
    try{
        const token=req.headers["authorization"].split(" ")[1];
        JWT.verify(token,process.env.JWT_Secret,(err,decode)=>{
            if(err)
            {
                return res.status(401).send({
                    success:false,
                    message:"unAuthorized user"
                });
            }
            else
            {
                req.body.id=decode.id;
                next();
            }
        });
    }
    catch(error)
    {
        res.status(401).send({
            success:false,
            message:"Please provide Authorization token",
            error
        })
    }
}