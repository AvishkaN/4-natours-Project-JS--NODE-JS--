const Review=require('../models/reviewModel');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');


// route controllers 
   
exports.getAllReviews=catchAsync(async(req,res,next)=>{
    let filter;
    if(req.params.tourId) filter={tour:req.params.tourId};
    // exicute the query
    const reviews=await Review.find(filter);
   
    // SEND RESPONSE                             
    res.status(200).json({
        status:'success',
        results:reviews.length,
        data:{
            review:reviews,
        }
    });
});

// exports.getReview=catchAsync(async(req,res,next)=>{
//     // exicute the query
//     const review=await Review.findById(req.params.id);

//     // SEND RESPONSE
//     res.status(200).json({
//         status:'success',
//         results:review.length,
//         data:{
//             review:review,
//         }
//     });
// });


exports.createReview=catchAsync(async(req,res,next)=>{

    if(!req.body.tour)  req.body.tour=req.params.tourId;
    if(!req.body.user)  req.body.user=req.user.id;

    // exicute the query
    const newReview=await Review.create(req.body);

    if(!newReview) return next(new AppError());

    // SEND RESPONSE
    res.status(201).json({
        status:'success',
        results:newReview.length,
        data:{
            newReview:newReview,
        }
    });
});









