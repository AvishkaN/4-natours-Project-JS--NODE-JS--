const mongoose = require("mongoose");

// SCHEMA
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true,
    },
    duration:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour must group size']
    },
    difficulty:{
        type:String,
        required:[true,'A tour must have a difficulty']
    },
    ratingsAverage:{  
        type:Number,
        required:[true,'A tour must have a RatingsAverages']
    },
    ratingsQuantity:{
        type:Number,
        required:[true,'A tour must have a difficulty']
    },
    rating:{
        type:Number,
        default:4.5 
    },
    price:{
        type:Number,
        required:[true,'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{  
        type:String,
        trim:true,
        required:[true,'A tour must have a summary']
    },
    description:{
        type:String,
        trim:true,
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a summary']
    },
    summary:{
        type:String,
        trim:true,
        required:[true,'A tour must have a summary']
    },
    images:[String],
    createAt:{
        type:Date,
        default:Date.now(),
        select:false,
    },
    startDates:[Date],
    price:{
        type:Number,
        required:[true,'A tour must have a price']
    },
});

const Tour=mongoose.model('Tour',tourSchema);

module.exports=Tour;

    

