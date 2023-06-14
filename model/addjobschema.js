
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
 
const addjobsSchema = mongoose.Schema({

    
    location:{
        type:String,
        required: true
    },


    
    post:{
        type:String,
        required: true
    },

    
    details:{
        type:String,
        required: true
    },


    quelification:{
        type:String,
        required:true
    },


    products:{
        type:String
        
    
        
    },

    description:{
        type:String,
        
    }
    
})
 

 
const userModel = mongoose.model('addjobs',addjobsSchema)
 
module.exports = userModel