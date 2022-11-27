const mongoose = require('mongoose')

const Schema = mongoose.Schema

  const storySchema = new Schema({
    storyTitle:{
        type: String,
        required: true
    },
    storyBody:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
  },{timestamps:true})

  module.exports=mongoose.model('Story',storySchema)