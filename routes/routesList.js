const express = require('express')
const router =express.Router()
const {postNewStory,updateStory,deleteStory,getStoryById,getAllStories}=require('../controllers/storiesController')
const {updateUser,deleteUserById,getUserById,getAllUsers,register,logIn}=require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


//all users endpoints
router.post('/user/login',logIn)
router.post('/user/register',register)
router.get('/user/getUserById/:id',protect,getUserById)
router.delete('/user/deleteUserById/:id',protect,deleteUserById)
router.put('/user/updateUser/:id',protect,updateUser)
router.get('/user/getAllUsers',protect,getAllUsers)

//all stories endpoints
router.post('/story/post',protect,postNewStory)
router.get('/story/getStoryById/:id',protect,getStoryById)
router.delete('/story/deleteStoryById/:id',protect,deleteStory)
router.put('/story/updateStory/:id',protect,updateStory)
router.get('/story/getAllStories',protect,getAllStories)

module.exports=router;