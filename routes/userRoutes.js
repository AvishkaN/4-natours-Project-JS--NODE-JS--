const express =require('express');
const Controllers = require('../controller/userController');
const authController = require('../controller/aurthController');

// route function
const router=express.Router();

router.post('/login',authController.login)
router.post('/signup',authController.signUp)

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


