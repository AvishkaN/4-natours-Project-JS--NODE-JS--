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
        // filter  quaring  METHOD  1
        // const tours=await Tour.find(req.query);
        
        // filter  quaring  METHOD  2
        // const tours=await Tour.find({duration:5,difficulty:"easy"})

        // // filter  quaring  METHOD  3
        // const tours=await Tour.find()
        //                                     .where('duration')
        //                                     .equals(5)
        //                                      .where('difficulty')
        //                                     .equals('easy')

        // BUILD the query
        const quaryObject={...req.query};
        const excludeItems=['page','sort','limit','fields']
        excludeItems.forEach(item=>delete  quaryObject[item])
        const query=await Tour.find(quaryObject);

        // exicute the query
        const tours=await query;

        // SEND RESPONSE
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
                
                



