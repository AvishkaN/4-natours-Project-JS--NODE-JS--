const crypto = require("crypto");
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
        validate:[validator.isEmail,'Please provide a valid email'],
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
        validate:{ // this only works CREATE and SAVE !!
            validator:function(el){
                return el === this.password;    
            }
        }
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    role:{  
        type:String,
        required:[true,'A user must have a role'],
        enum:['admin','user','guide','lead-guide'],
        default:'user'
    },
});

// MIDDLEWERES for events
UserSchema.pre('save',async function(next){
    // only run password modification
    if(!this.isModified('password')) return next();
    //encrpt password using bycrypt
    console.log(this.password);
    this.password=await bcrypt.hash(this.password,10);
    // passwordConfirm undifiend 
    this.passwordConfirm=undefined; 

    next();
});
UserSchema.pre('save',function(next){

    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChanedAt=Date.now()-1000;
    next();
});

// INSTANT METHODS
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
UserSchema.methods.createPasswordResetToken= function(JWTTimestamp){
    const resetToken=crypto.randomBytes(32).toString('hex');

    this.passwordResetToken=crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');

    //  encryption
    this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;
};



//Model
const User=mongoose.model('User',UserSchema);

module.exports=User;

    

