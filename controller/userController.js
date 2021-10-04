const CatchAsync=require('../utils/catchAsync');
const User=require('../models/userModel');



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

