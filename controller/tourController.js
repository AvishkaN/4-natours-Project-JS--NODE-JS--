const Tour =require('../models/tourModel');
const APIFeatures =require('../utils/apiFeatures');
const catchAsync =require('../utils/catchAsync');
const AppError = require('./../utils/appError');

 
//  middlewere  
exports.aliasTopTours=(req,res,next)=>{

    req.query.limit='5';
    req.query.sort='-ratingsAvearage,price';
    req.query.fields='ratingsAverage,price,difficulty,summary,name';
    next();
};



// route controllers  

exports.getAllTours= catchAsync(async(req,res,next) =>{
  
        // exicute the query
        const features=new APIFeatures(Tour.find(),req.query)
                .filter()
                .sort()
                .fieldLimiting()
                .pagination();
        const tours=await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                tours:tours,
            }
        });



})

// exports. getTour=async(req,res,next)=>{
//     try{
    
//         const tour=await Tour.findById(req.params.id);
    
//             res.status(200).json({
//                 status:'success',
//                 results:tour.length,
//                 data:{
//                     tour:tour,
//                 }
    
//             });
    
//     }catch(err){ 
//         return next(new AppError('No tour found with that ID',404));

//     }
// };  

exports. getTour=catchAsync(async(req,res,next)=>{
   
    
        const tour=await Tour.findById(req.params.id);
    
            res.status(200).json({
                status:'success',
                results:tour.length,
                data:{
                    tour:tour,
                }
    
            });
    

});  









exports.createTour=catchAsync(async (req,res,next)=>{
//  try{
        const newtour= await Tour.create(req.body);
        if(!newtour){ 
            return next(new AppError('No tour found with that ID'),404);
        }

        res.status(200).json({
            status:'success',  
            data:{     
                tour:newtour 
            }
        }); 
// }
// catch(err){
//         res.status(404).json({
//             status:'failed',
//             message: err.message,  
//             // message:'Invalid data sent !'
//         }); 
//     }
});

exports.updateTour=catchAsync(async (req,res,next)=>{
    
    const Id=req.params.id;

        const tour=await Tour.findByIdAndUpdate(Id,req.body,{
            new:true,
            runValidators:true,
        });

        if(!tour){
            return next(new AppError('No tour found with that ID'),404);
        }


        res.status(200).json({
            status:'success',
            data:{
                tour:tour,
            }

        });

});


exports.deleteTour=catchAsync(async (req,res,next)=>{
            await Tour.findByIdAndDelete(req.params.id);


            if(!tour){
                return next(new AppError('No tour found with that ID'),404);
            }
    

            res.status(200).json({
                    status:'success',
                    data:{
                            tour:tour,
                        }
                    
                    });
});
exports.getTourStats=catchAsync(async (req,res)=>{ // http://localhost:8000/api/v1/tours/tour-stats
            const stats=await Tour.aggregate([ 
             
                {
                    $match:{ratingsAverage:{ $gte:4.5 }}
                },
                {
                    $group:{
                        _id:{$toUpper:`$difficulty`},
                        num:{$sum:1},
                        numRating:{$sum:`$ratingsQuantity`},
                        avgRating:{$avg:`$ratingsAverage`},
                        avgPrice:{$avg:`$price`},
                        minPrice:{$avg:`$price`},
                        maxPrice:{$avg:`$price`},
                    }
                },
                {
                    $sort:{avgPrice:1}
                },
                // {
                //     $match:{_id:{$ne:'EASY'}}  // excluding
                // }
            ]);

            res.status(200).json({
                    status:'success',
                    data:{
                            tour:stats,
                        }
                    
                    });
});
                
                



