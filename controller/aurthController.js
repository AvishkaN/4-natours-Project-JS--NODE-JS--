const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const CatchAsync=require('../utils/catchAsync');
const User=require('../models/userModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

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
    console.log(req.body.password);
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        passwordChanedAt:req.body.passwordChanedAt,
        role:req.body.role, 
        // passwordResetToken:req.body.passwordResetToken,
        // passwordResetExpires:req.body.passwordResetExpires,
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
            user:user,
           
        });
});


exports.protect=CatchAsync(async(req,res,next)=>{
    // 1)  Getting token and check of its true
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    
    if(!token){
        return  next( new AppError('you are not logged in ! Please log in to get access',401));
    }
    
    // 2)  Verification token
    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    // 3)  check if user still exist
        const currentUser=await User.findById(decoded.id);
        if(!currentUser) {
            const message=new AppError(' The user beloging to this token does no longer  exist .',401).message;
            const errrrrr=new AppError('The user beloging to this token does no longer  exist .',401)
            const errrrrrObj={message,...errrrrr};
            return  next(errrrrrObj);

        }

    // 4)  check if user changed password after the token was issude
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('user recently changed password! please log in agin ',401))
    }

    // GRANT ACCESS TO PROTECTED ROUTER
    req.user=currentUser;
    next()
});

exports.restricTo=(...roles)=>{
    return (req,res,next)=>{
        // roles | 'admin' , 'lead-guide' , 'user'
        if(!roles.includes(req.user.role)){
            next(new AppError('You do not have permission to perfom this !',403));
        }
        next()
    }
};

exports.forgotPassword=catchAsync(async(req,res,next)=>{

    // 1  Get user based on POSTED email
        const user =await User.findOne({email:req.body.email});
        if(!user){
            next(new AppError('There is no user with this email address',404));
        }
        // 2  Genarate the random reset token 
        const resetToken=user.createPasswordResetToken();
        // await user.save;
        await user.save({ validateBeforeSave:false });
       
        // 3 send it to user 
        const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
        const message=`forgot your password . create new password to ${resetURL}`;

    try{
        await sendEmail({
            email:user.email,
            subject:'your password token reset (valid for 10 min)',
            message:message,
        });

        res.status(200).json({
            status:'success',
            message:'Token sent to email'
        });
    }catch(err){
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;
        await user.save({ validateBeforeSave:false });


        // return next(new AppError('there was error about send email ',500));
        return next(new AppError(err,500));
    }

});
exports.resetPassword=catchAsync(async(req,res,next)=>{
    // 1) get user based on the token
        const hashedToken=crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

            const user =await User.findOne({
                passwordResetToken:hashedToken,
                passwordResetExpires:{$gt:Date.now()}
            })
            
         // 2) if token has not expires set new password
        if(!user){
          return  next(new AppError('Token is invalid or  has expired',400));
        }
    // 3) update password
        user.password=req.body.password;
        user.passwordConfirm=req.body.passwordConfirm;
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;
        await user.save();

    // 4) log the user in ,send jwt
    const token=signToken(user._id);

    res.status(200).json({
        status:'success',
        token
    });
});

exports.updatePassword=catchAsync(async(req,res,next)=>{
    // 1 ) get user from collection
    const user=await User.findById(req.user.id).select('+password');
    // 2 ) check if posted current password  in correct
   const correct=user.correctPassword(req.body.CurPassword,user.password);
   if(!correct){
       return next(new AppError('you entered password is incorrect',404));
   };
    // 3 ) update password
    user.password=req.body.NewPassword;
    user.passwordConfirm=req.body.ConfirmPassword;
    await user.save();
    // 4 ) update and login 
    const token=signToken(user._id);

    res.status(200).json({
        status:'success',
        token
    });

});

