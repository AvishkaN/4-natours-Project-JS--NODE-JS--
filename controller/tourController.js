const fs =require('fs');

let tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
  
exports.checkBody=(req,res,next)=>{

    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status:'fail',
            message:'Missing name or place'
        });
    }
    next();
};


exports.checkId=(req,res,next,val)=>{
    console.log(`hello middle`);
    const id=req.params.id;
    if(id*1>tours.length){
     return   res.status(404).json({
            status:'fail',
            message:'Invalid ID'
    });
    }

next();
}; 


// route controllers
// --> tours
exports.getAllTours=((req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours:tours
        }
    });

})

exports. getTour=((req,res)=>{
    const Id=req.params.id*1;
    const tour=tours.find(item=>item.id===Id);

    res.status(200).json({
        status:'success',
        results:1,
        data:{
            tour:tour
        }
    });

})

exports.createTour=(req,res)=>{
    const id=tours.length;
    const newTour=Object.assign({id},req.body);
    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
        res.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                tours:tours
            }
        });
        
    })
}

exports.updateTour=(req,res)=>{
    const id=req.params.id;

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
