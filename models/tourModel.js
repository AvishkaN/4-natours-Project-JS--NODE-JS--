const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

// SCHEMA
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true,
        maxlength:[40,'A tour name must have more or equal 40 charactors'],
        minlength:[3,'A tour name must have more or equal 2 charactors'],
        validate:[validator.isAlpha,'tour name should only conatin charactors']
    },
    slug:String,
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
        required:[true,'A tour must have a difficulty'],
        enum:{
            values:['easy','medium','difficult'],
            message:'Diffuculty is either: easy, medium , difficult',
        }
    },
    ratingsAverage:{  
        type:Number,
        required:[true,'A tour must have a RatingsAverages'],
        min:[1,'rating must have above 1.0'],
        max:[5,'rating must have above 5.0']
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
    priceDiscount:{
        type:Number,
        validate:{
            validator:function(val){
                return val<this.price;
            },
            message:'Discount price ({VALUE}) should be below regular price'
        }
    },
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
    secretTour:{
        type:Boolean,
        default:false,
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

// virtual proparties
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7
});
// mongoose  miidleweres
// tourSchema.pre('save',function(next){
//     this.slug=slugify(this.name,{lower:true})
//     next();
// });
// tourSchema.pre('save',function(next){  
//     console.log('document will save....');
//     next();
// });
// tourSchema.post('save',function(doc,next){  
//     console.log(doc);
//     next();
// });

// QUERRY MIDDLEWERE
// tourSchema.pre(/^find/,function(next){  
//     this.find({secretTour:{$ne:true}});
//     this.start=Date.now();
//     next();
// });
// tourSchema.post(/^find/,function(docs,next){  
//     console.log(Date.now());
//     console.log(this.start);
//     console.log(`${Date.now()-this.start} milliseconds`)
//     next();
// });
// tourSchema.pre('aggregate',function(next){  
//     this.pipeline().unshift({ $match:{secretTour:{$ne:true}} });
//     next();
// });

const Tour=mongoose.model('Tour',tourSchema);

module.exports=Tour;

    

