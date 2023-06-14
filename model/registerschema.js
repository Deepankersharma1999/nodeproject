
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
 
const userSchema = mongoose.Schema({
    uname:{
        type:String,
        
        required: true
    },
    email:{
        type:String,
        
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    pnumber:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    }
})
 

// 1st way to to bcrypt  the password///////////////////////

// userSchema.pre("save",function(next){
//     if(!this.isModifide("password")){
//         return next();
//     }

//     this.password = bcrypt.hashsync(this.password, 10);
//     next();
// });

// userSchema.method.comparePassword = function(plaintext, callback)
// {
//     return callback(null, bcrypt.compareSync(Plaintext,this.psw));
// };

// 1st way to to bcrypt  the password///////////////////////





//2nd easy way to bcrypt passwords//////////////////////

userSchema.pre('save',async function(next)
{
if(this.isModified('pass'))
{
    this.pass=await bcrypt.hash(this.pass,12);
    // this.psw=await bcrypt.hash(this.confirmPassword,12)
}
next();
})



 
const userModel = mongoose.model('signup',userSchema)
 
module.exports = userModel