const CatchAsync=require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User=require('../models/userModel');

const filterObj=(obj,...allowedFields)=>{
    const newObj={};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el))  newObj[el]=obj[el]
    })
    return newObj;
}

// --> users controlers
exports.getAllUsers=CatchAsync(async(req,res)=>{

    const users=await User.find();

    res.status(200).json({
        status:'success',
        results:users.length,
        data:{
            users:users
        }
    });

});

exports.createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
exports.getUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
exports.updateUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
exports.deleteUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}


exports.updateUserData=catchAsync(async(req,res,next)=>{
    //  1 ) create error if usert post password update
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password update.Please use /updateMyPassword',400));
    }
    // 2 ) filtered out field names 
    const filteredBody=filterObj(req.body,'name','email');
    // 3 ) update document
    const updatedUser=await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    })
});
exports.deleteUser=catchAsync(async(req,res,next)=>{
  
  await User.findByIdAndUpdate(req.user.id,{active:false})

    res.status(200).json({
        status:'success',
        data:null
    })
});
