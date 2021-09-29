const express =require('express');
const Controllers = require('../controller/tourController');

 

// route function
const router=express.Router();

//condiitonal check middlewere 
    // router.param('id',Controllers.checkId) // --> param middle were




router.route('/top-5-cheap').get(Controllers.aliasTopTours,Controllers.getAllTours);
router.route('/tour-stats').get(Controllers.getTourStats);

router      
    .route('/')
    .get(Controllers.getAllTours)
    .post(Controllers.createTour)

router
    .route('/:id')
    .get(Controllers.getTour)
    .patch(Controllers.updateTour)
    .delete(Controllers.deleteTour)


module.exports=router;


