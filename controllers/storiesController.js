const mongoose = require('mongoose')
const  story  = require('../models/storyModel')

// for creating a new ustory
const postNewStory = async (req,res)=>{
    const  {storyTitle, storyBody,userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        res.status(404).json({error:'user id not valid'});
    }
    else{
        try {
            const document = await story.create({storyTitle, storyBody,userId});
            res.status(200).json( {'status':true,'message':'succefull',StoryId:document._id});
        } catch (error) {
            res.status(400).json({error: error.message})   
           }
    }
}
// update a story
const updateStory = async (req,res)=>{
    const  {storyTitle, storyBody} = req.body;
        try {
            const document = await story.findByIdAndUpdate(req.params.id, 
                { storyTitle: storyTitle,storyBody:storyBody });
            
            res.status(200).json( {'status':true,'message':'succefully updated the story'});
        } catch (error) {
            res.status(400).json({error: error.message})   
           } 
}
// delete story
const deleteStory = async (req,res)=>{
        try {
            const query = await story.findByIdAndDelete(req.params.id);
            res.status(200).json( {'status':true,'message':'succefully deleted the story'});
        } catch (error) {
            res.status(400).json({error: error.message})   
           }
}
// get story by id
const getStoryById = async (req,res)=>{

        try {
            const currentStory = await story.findById(req.params.id);
            if(!currentStory){
                res.status(400).json({error: "story not found"})
            }
            res.status(200).json( {'status':true,'story':currentStory});
        } catch (error) {
            res.status(400).json({error: error.message})   
        }
    
}
// get stories
const getAllStories = async (req,res)=>{
    
    try {
        const stories = await story.find().sort({createdAt: -1});
        if(!stories){
            res.status(400).json({error: "no data found"})
        }
        res.status(200).json( {'status':true,list:stories});
    } catch (error) {
        res.status(400).json({error: error.message})   
       }
}

module.exports= {
    postNewStory,updateStory,deleteStory,getStoryById,getAllStories
}