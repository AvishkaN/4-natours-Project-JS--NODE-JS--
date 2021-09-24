const express =require('express');
const Controllers = require('../controller/tourController');

 

// route function
const tourRouter=express.Router();

// --> tours
tourRouter
    .route('/')
    .get(Controllers.getAllTours)
    .post(Controllers.createTour)

tourRouter
    .route('/:id')
    .get(Controllers.getTour)
    .patch(Controllers.updateTour)
    .delete(Controllers.deleteTour)



module.exports=tourRouter;


