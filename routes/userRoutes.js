const express =require('express');
const Controllers = require('../controller/userController');

// route function
const userRouter=express.Router();



userRouter
    .route('/')
    .get(Controllers.getAllUsers)
    .post(Controllers.createUser)

// --> users
userRouter
    .route('/')
    .get(Controllers.getAllUsers)
    .post(Controllers.createUser)

userRouter
    .route('/:id')
    .get(Controllers.getUsers)
    .patch(Controllers.updateUsers)
    .delete(Controllers.deleteUsers)




module.exports=userRouter;


