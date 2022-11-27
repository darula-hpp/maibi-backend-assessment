const jwt = require('jsonwebtoken')
const user = require('../models/userModel')

const protect = async (req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // get user from the token
            req.user = await user.findById(decoded.id).select('-password')

            next()
        } catch (error) {
           console.log(error);
           res.status(401).json({error: 'Not authorized'})  
        }
    }
    if(!token){
        res.status(401).json({error: 'Not authorized, no token found'})  
    }
}
module.exports= {
    protect
}