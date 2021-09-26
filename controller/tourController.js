const Tour =require('../models/tourModel');

//  middlewere
exports.checkBody=(req,res,next)=>{

    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status:'fail',
            message:'Missing name or place'
        });
    }
    next();
};





// route controllers  
    // --> tours
exports.getAllTours=((req,res)=>{
    res.status(200).json({
        status:'success',
        // results:tours.length,
        // data:{
        //     tours:tours
        // }
    });

})

exports. getTour=((req,res)=>{
    const Id=req.params.id*1;
    // const tour=tours.find(item=>item.id===Id);

    // res.status(200).json({
    //     status:'success',
    //     results:1,
    //     data:{
    //         tour:tour
    //     }
    // });

})

exports.createTour=(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        // data:{
        //     tours:tours
        // }
    });
}

exports.updateTour=(req,res)=>{

    res.status(200).json({
        status:'success',
        data:{
            tour:'updated here'
        }
    });
}

exports.deleteTour=(req,res)=>{
    res.status(204).json({
        status:'success',
        data:null
    });
}
