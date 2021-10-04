const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


// SCHEMA
const UserSchema=new mongoose.Schema({
    name:{  
        type:String,
        required:[true,'please enter your name'],
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:[true,'A user must have a email'],
        validate:[validator.isEmail,'Please provide a void email'],
    },
    photo:{
        type:String,
    },
    password:{  
        type:String,
        required:[true,'A user must have a password'],
        minlength:8,
        select:false,
    },
    passwordChanedAt:{type:Date},
    passwordConfirm:{
        type:String,
        required:[true,'please  conform password '],
        validate:{
            validator:function(el){
                return el === this.password;    
            }
        }
    },
});

// MIDDLEWERES for events
UserSchema.pre('save',async function(next){
    // only run password modification
    if(!this.isModified('password')) return next();
    //encrpt password using bycrypt
    this.password=await bcrypt.hash(this.password,10);
    // passwordConfirm undifiend 
    this.passwordConfirm=undefined; 

    next();
});

UserSchema. methods.correctPassword=async function(candidatePassword,userPasswod){

    return await bcrypt.compare(candidatePassword,userPasswod);

};
UserSchema.methods.changedPasswordAfter= function(JWTTimestamp){
    if(this.passwordChanedAt){
        const changedTimeStamp=parseInt(
            this.passwordChanedAt.getTime()/1000,
            10)
            
         return    changedTimeStamp>JWTTimestamp
    }
    return false;
};



//Model
const User=mongoose.model('User',UserSchema);

module.exports=User;

    

