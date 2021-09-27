const Tour =require('../models/tourModel');

//  middlewere
// exports.checkBody=(req,res,next)=>{

//     if(!req.body.name || !req.body.price){
//         return res.status(404).json({
//             status:'fail',
//             message:'Missing name or place'
//         });
//     }
//     next();
// };





// route controllers  
    // --> tours
exports.getAllTours= (async(req,res) =>{

    try{
        const tours=await Tour.find();

        res.status(200).json({
            status:'success',
            results:1,
            data:{
                tours:tours,
            }

        });
    }
    catch(err){
        res.status(404).json({
            status:'failed',
            message:err,
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
        console.log(newtour);
        
        res.status(200).json({
            status:'success',  
            data:{     
                tour:newtour 
            }
        }); 
    }catch(err){
        console.log(newtour);
        res.status(404).json({
            status:'failed',
            message: 'Invalid data sent !'
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
                
                



