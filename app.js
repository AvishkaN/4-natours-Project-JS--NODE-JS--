const express =require('express');
const fs =require('fs');
const morgan =require('morgan');

const app=express();
app.use(express.json());
 

// Middleweres
app.use(morgan('dev'));
// app.use((req,res,next)=>{
//     console.log(`hello to the middlewere ✋`);
//     next();
// });
// // manipulate middlewere
// app.use((req,res,next)=>{
//     console.log(`timing middle were`);
//     req.reqTime=new Date().toISOString();
//     next();
// });




// route handlers
// --> tours

let tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const getAllTours=((req,res)=>{
    // console.log(req.reqTime);
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours:tours
        }
    });

})

const getTour=((req,res)=>{
    const Id=req.params.id*1;
    const tour=tours.find(item=>item.id===Id);

    if(!tour) {
      return  res.status(404).json({
            status:'failed',
            message:'Invaalid ID'
    });
    }

    res.status(200).json({
        status:'success',
        results:1,
        data:{
            tour:tour
        }
    });

})

const createTour=(req,res)=>{
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

const updateTour=(req,res)=>{
    const id=req.params.id;

    if(id*1>tours.length){
        res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }

    res.status(200).json({
        status:'success',
        data:{
            tour:'updated here'
        }
    });
}

const deleteTour=(req,res)=>{
    const id=req.params.id;

    if(id*1>tours.length){
        res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }

    res.status(204).json({
        status:'success',
        data:null
    });
}

// --> users
const getAllUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}

const createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
const getUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
const updateUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
const deleteUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}

// route function
const tourRouter=express.Router();
const userRouter=express.Router();

// --> tours
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


// --> users
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter
    .route('/:id')
    .get(getUsers)
    .patch(updateUsers)
    .delete(deleteUsers)

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

//Server
const port=8000;
app.listen(port,()=>{
    console.log('App running on port ');
});
