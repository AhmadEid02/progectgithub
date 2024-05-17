const jwt=require('jsonwebtoken')
const user =require('../modal/userModal')

const middleware=async(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization is req"})
    }
    const token =authorization.split(' ')[1]
   
    try {
        //the encryption was based on userid so after decryption we will get user id 
        const{_id}= jwt.verify(token,process.env.SECRET)
        //we useit to get just the workouts that one user have created. in the api get all workout  
        req.user=await user.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:"Request is not authorized"+error})
    }
}
module.exports=middleware