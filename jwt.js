
const jwt = require("jsonwebtoken")


const createToken =(user)=>{

       jwt.sign({user},"ScretKey",{expiresIn:"100s"},(err,token)=>{
        try{
        res.json({token})
        }
        catch(err){
            console.log(err)
        }
    })
}


//Middleware
function verifyToken (req,res,next)
{
    const bearerHeader = req.headers['authorization'];
    
    if(bearerHeader !== "Null"){
        const bearerAuth = bearerHeader.split(' ')[1]
        req.bearerAuth = bearerAuth
        console.log(verifyToken)
        next()
    }else{
        res.send("Token is not valid")
    }
}

module.exports= {createToken,verifyToken}
