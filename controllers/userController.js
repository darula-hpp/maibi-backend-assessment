const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// log in 
const logIn = async (req,res)=>{
    const  {password, email} = req.body;
    // console.log(req.body);
    try {
        const user = await User.findOne({email});
        if(user&&(await bcrypt.compare(password,user.password))){
            res.status(200).json( {
                'status':true,
                'message':'succefull',
                token:generateToken(user.id),
                userId:user.id,
                email:user.email,
                name:user.name,
                surname:user.surname,
                phone:user.phone,
                gender:user.gender});
        }else{
            res.status(400).json({'status':false,error: 'Invalid user credentials'})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})   
       }
}
// register
const register = async (req,res)=>{
    const  {
        email, 
        name,
        surname,
        password,
        gender,
        phone} = req.body;
        // check that all inputs are filled
        if(!name||!surname||!email||!phone||!password||!gender){
            res.status(400).json({status:false,error: 'please add all fields'}) 
        }
        //check if the user exists
        const userExists= await User.findOne({email})
        if (userExists) {
           res.status(400).json({status:false,error: 'user already exists'})
        }
        // hash the password
        const salt = await  bcrypt.genSalt(10);
        const Hashedpassword = await bcrypt.hash(password,salt);
    // console.log(req.body);
    try {
        const user = await User.create({name,surname,email,phone,password:Hashedpassword,gender});
        res.status(200).json( {status:true,token:generateToken(user.id)});
    } catch (error) {
        res.status(400).json({status:false,error: error.message})   
       }
}


// Get user By Id
const getUserById = async (req,res)=>{
        try {
            const currentUser = await User.findById(req.params.id);
            if(!currentUser){
                res.status(400).json({error: "user not found"})
            }
            res.status(200).json( {'status':true,'user':currentUser});
        } catch (error) {
            res.status(400).json({error: error.message})   
           }
}
// get all users
const getAllUsers = async (req,res)=>{
    // console.log(req.body);
    try {
        const currentUser = await User.find().sort({createdAt: -1}).select('-password');
        if(!currentUser){
            res.status(400).json({error: "user not found"})
        }
        res.status(200).json( {'status':true,list:currentUser});
    } catch (error) {
        res.status(400).json({error: error.message})   
       }
}

//Delete user By Id
const deleteUserById = async (req,res)=>{
        try {
            const query = await User.findByIdAndDelete(req.params.id);
            res.status(200).json( {'status':true,'message':'succefully deleted account'});
        } catch (error) {
            res.status(400).json({error: error.message})   
           }
}
// update user
const updateUser = async (req,res)=>{
    const  {
        email, 
        name,
        surname,
        gender,
        phone} = req.body;
 // console.log(req.body);
    try {
        const document = await User.findByIdAndUpdate(req.params.id, 
            { email: email,name:name,surname:surname,gender:gender,phone:phone });
        
        res.status(200).json( {'status':true,'message':'succefully updated the user'});
    } catch (error) {
        res.status(400).json({error: error.message})   
       }
}
// Generate token
const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
module.exports = {
    updateUser,deleteUserById,getUserById,register,logIn,getAllUsers
}