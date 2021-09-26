const express =require('express');
const Controllers = require('../controller/tourController');

 

// route function
const router=express.Router();

//condiitonal check middlewere 
    // router.param('id',Controllers.checkId) // --> param middle were


// --> tours
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


