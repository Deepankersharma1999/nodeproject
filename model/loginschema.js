
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
 
const userSchema = mongoose.Schema({

    name:{
          type:String,
          required:true
         },
   
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }

})
 

 
const userModel = mongoose.model('login',userSchema)
 
module.exports = userModel