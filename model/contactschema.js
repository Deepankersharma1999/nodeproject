const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
 
const ContactusSchema = mongoose.Schema({

    
   
    email:{
        type:String,
        required:true
    },

  

    subject:{
        type:String,
    }


})
 

 
const userModel = mongoose.model('contactus',ContactusSchema)
 
module.exports = userModel