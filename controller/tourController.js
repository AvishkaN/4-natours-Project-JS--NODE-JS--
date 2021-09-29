const Tour =require('../models/tourModel');
const APIFeatures =require('../utils/apiFeatures');

//  middlewere
exports.aliasTopTours=(req,res,next)=>{

    req.query.limit='5';
    req.query.sort='-ratingsAvearage,price';
    req.query.fields='ratingsAverage,price,difficulty,summary,name';
    next();
};



// route controllers  

exports.getAllTours= (async(req,res) =>{
    try{
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
    }
    catch(err){
        res.status(404).json({
            status:'failed',
            message:err.message,
        });
        
    }

})

exports. getTour=(async(req,res)=>{
    const Id=req.params.id;
    try{

        const tour=await Tour.findById(Id);

        res.status(200).json({
            status:'success',
            results:1,
            data:{
                tour:tour,
            }

        });
    }
    catch(err){
        res.status(404).json({
            status:'failed',
            message:err,
        });
    }
});

exports.createTour=async (req,res)=>{
 try{
        const newtour= await Tour.create(req.body);
        res.status(200).json({
            status:'success',  
            data:{     
                tour:newtour 
            }
        }); 
}catch(err){
        res.status(404).json({
            status:'failed',
            message: '@#####'   
            // message:'Invalid data sent !'
        }); 
    }
}

exports.updateTour=async (req,res)=>{
    
    const Id=req.params.id;

    try{
        const tour=await Tour.findByIdAndUpdate(Id,req.body,{
            new:true,
            runValidators:true,
        });

        res.status(200).json({
            status:'success',
            data:{
                tour:tour,
            }

        });
    }
    catch(err){
        res.status(404).json({
            status:'fail',
            message:err,
        });
        
    }
} 


exports.deleteTour=async (req,res)=>{
        try{
            await Tour.findByIdAndDelete(req.params.id);
            res.status(200).json({
                    status:'success',
                    data:{
                            tour:tour,
                        }
                    
                    });
        }
            catch(err){
                res.status(404).json({
                        status:'fail',
                        message:err,
                    });
                    
            }
};
                
                



