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
exports.aliasTopTours=(req,res,next)=>{

    req.query.limit='5';
    req.query.sort='-ratingsAvearage,price';
    req.query.fields='ratingsAverage,price,difficulty,summary,name';
    next();
};





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
    

        //  console.log(JSON.parse(req.query));

                
                
        // 1A FILTERING 
        // BUILD the query
        const quaryObject={...req.query};
        const excludeItems=['page','sort','limit','fields']
        excludeItems.forEach(item=>delete  quaryObject[item])
                
        //1B ADVANCE FILTERING
        let quarySTR=JSON.stringify(quaryObject);
        quarySTR=quarySTR.replace(/\b(lt|gt|lte|gte)\b/g,match=>`$${match}`)
        
        let query=  Tour.find(JSON.parse(quarySTR));
        
        // 2 SORTING  
        if(req.query.sort){
            const sort=req.query.sort.split(',').join(' ');
            query=query.sort(sort)
        }else{
            query=query.sort('-createAt')
        }
        
        // 3) FILED LIMITING
        if(req.query.fields){
            const fields=req.query.fields.split(',').join(' ');
            query=query.select(fields)
        }else{
            query=query.select('-__v')

        }


        // 4) PAGINATION
        // 1 - 
        
        const page=req.query.page*1 | 1; 
        const limit=req.query.limit*1 || 100; 
        const skip=(page-1) * limit; 
        query=query.skip(skip).limit(limit);

        if(req.query.page){
            const numTours=await Tour.countDocuments();
            if(skip >= numTours) {
                throw new Error('This page does not exist');
            }
        }


        // exicute the query
        const tours=await query;
        // console.log(tours);



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
                
                



