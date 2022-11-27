const mongoose = require('mongoose')

const Schema = mongoose.Schema
    
  const UserSchema = new Schema({
    name:{
        type: String,
        required: [true,'please enter name']
    },
    surname:{
        type: String,
        required: [true,'please enter surname']
    },
    email:{
        type: String,
        required: [true,'please enter email'],
        unique:true
    },
    phone:{
        type: String,
        required: [true,'please enter phone']
    },
    password:{
        type: String,
        required: [true,'please enter password'],
    },
    gender:{
        type: String,
        required: [true,'please enter gender']
    }
  },{timestamps:true})

  module.exports=mongoose.model('User',UserSchema)