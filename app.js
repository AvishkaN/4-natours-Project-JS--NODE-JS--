const express =require('express');
const fs =require('fs');

const app=express();
app.use(express.json());
 

let tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours=((req,res)=>{
    console.log(tours);
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

// app.get('/api/v1/tours',getAllTours);
// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);


app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


const port=8000;
app.listen(port,()=>{
    console.log('App running on port ');
});
