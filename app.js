const express =require('express');
const morgan =require('morgan');
const tourRouter = require('./routes/tourRouts');
const userRouter = require('./routes/userRoutes');


const app=express();
app.use(express.json());
 
// console.log(process.env.PORT);

// Middleweres
if(process.env.NODE_ENV==='development'){
    console.log(`development`);
    app.use(morgan('dev'));
}
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

app.use(express.static(`${__dirname}/public`));


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports =app;