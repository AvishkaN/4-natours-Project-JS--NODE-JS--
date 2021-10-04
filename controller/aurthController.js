const jwt=require('jsonwebtoken');
const CatchAsync=require('../utils/catchAsync');
const User=require('../models/userModel');
const AppError = require('../utils/appError');

const signToken=(id)=>{
    const token=jwt.sign(
        {id:id},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES_IN
        });

    return  token;
};

exports.signUp=CatchAsync(async(req,res,next)=>{
    
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        passwordChanedAt:req.body.passwordChanedAt,
    });
    

    const token=signToken(newUser._id);

    res.status(200).json({
            status:'succes',
            token:token,
            data:{
                user:newUser
            }
        });
});
exports.login=CatchAsync(async(req,res,next)=>{
    
    const {email,password}=req.body;

    // guard class
    if(!email || !password){
    return new AppError('please enter email and password');   
    }

    // get user from mongoDB by email
    const user=await User.findOne({email}).select('+password');

    // guard class for invalid email or password
    if(!user || !await user.correctPassword(password,user.password)){
        return next(new AppError('Invalid user name or password',401));
    };

    // creat token
    const token=signToken(user._id);

    //  send response 
    res.status(200).json({
            status:'succes',
            token:token,
           
        });
});


exports.protect=CatchAsync(async(req,res,next)=>{
    // 1)  Getting token and check of its true
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    
    if(!token){
        return  next( new AppError('you are not logged in ! Please log in to get access',401));
    }
    
    // 2)  Verification token
    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    // 3)  check if user still exist
        const currentUser=await User.findById(decoded.id);
        if(!currentUser) {
            const message=new AppError(' The user beloging to this token does no longer  exist .',401).message;
            const errrrrr=new AppError('The user beloging to this token does no longer  exist .',401)
            const errrrrrObj={message,...errrrrr};
            return  next(errrrrrObj);

        }
        console.log(currentUser);

    // 4)  check if user changed password after the token was issude
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('user recently changed password! please log in agin ',401))
    }

    // GRANT ACCESS TO PROTECTED ROUTER
    req.user=currentUser;
    next()
});





