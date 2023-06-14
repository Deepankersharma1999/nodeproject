
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
 
const ApplynowSchema = mongoose.Schema({

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
    },


    cpassword:{
        type:String,
        required:true
    },


    number:{
        type:String,
    },


    address:{
        type:String,
        required:true
    },


    file:{
        type:String,
    
    },



    r1:{
        type:String,
        required:true
    },

    

   

    education:{
        type:String,
    }

})
 

 
const userModel = mongoose.model('Applynow',ApplynowSchema)
 
module.exports = userModel