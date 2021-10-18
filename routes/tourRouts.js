const express =require('express');
const Controllers = require('../controller/tourController');
const authController = require('../controller/aurthController');
const reviewRouter = require('../routes/reviewrouter');

 

// route function
const router=express.Router();

//condiitonal check middlewere 
    // router.param('id',Controllers.checkId) // --> param middle were




router.route('/top-5-cheap').get(Controllers.aliasTopTours,Controllers.getAllTours);
router.route('/tour-stats').get(Controllers.getTourStats);


router.use('/:tourId/reviews',reviewRouter)  

router      
    .route('/')
    .get(authController.protect,Controllers.getAllTours)
    .post(Controllers.createTour)

router
    .route('/:id')
    .get(Controllers.getTour)
    .patch(Controllers.updateTour)
    .delete(
        authController.protect,
        authController.restricTo('admin','lead-guide'),
        Controllers.deleteTour
    )

// router
//     .route('/:tourId/reviews')
//     .post(
//         authController.protect,
//         authController.restricTo('user'),
//         reviewController.createReview
//     );

module.exports=router;


