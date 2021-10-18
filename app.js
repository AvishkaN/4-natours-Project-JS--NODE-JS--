const express =require('express');
const morgan =require('morgan');
const globleErrorHandler = require('./controller/errorController');

const tourRouter = require('./routes/tourRouts');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewrouter');


const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app=express();
 
 
// GLOBLE Middleweres
// set secuirity htttp header
app.use(helmet());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

// Limit request from same API
const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:"Too many request from this Ip please try again later"
});
app.use('/api',limiter);

// BODY parser, reading data from into req.body
app.use(express.json({limit:'10kb'}));

// Data sanitaization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitaization against XSS
app.use(xss());

// Prevent paramerter pollutions
app.use(
    hpp({
        whitelist:[
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// ROTES
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);


app.all('*',(req,res,next)=>{
    next(new AppError(`can't find ${req.originalUrl} on the server`,404));
});

// globle error handling
app.use(globleErrorHandler);

 
module.exports =app;