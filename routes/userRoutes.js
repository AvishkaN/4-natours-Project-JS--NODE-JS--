const express =require('express');
const Controllers = require('../controller/userController');

// route function
const router=express.Router();


router
    .route('/')
    .get(Controllers.getAllUsers)
    .post(Controllers.createUser)

// --> users
router
    .route('/')
    .get(Controllers.getAllUsers)
    .post(Controllers.createUser)

router
    .route('/:id')
    .get(Controllers.getUsers)
    .patch(Controllers.updateUsers)
    .delete(Controllers.deleteUsers)




module.exports=router;


