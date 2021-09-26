const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({path:'./config.env'});

const app = require("./app");
   

const DB=process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD 
);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`db connection successfull !`);
});

// SCHEMA
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true,
    },
    rating:{
        type:Number,
        default:4.5 
    },
    price:{
        type:Number,
        required:[true,'A tour must have a name']
    }
});

const Tour=mongoose.model('Tour',tourSchema);

// const testTour=new Tour({
//     name:'The hello world',
//     rating:4.9,
//     price:499,
// });
const testTour=new Tour({     
    name:'The hello world 2',    
    price:499,
});
// SAVE 
testTour
    .save()
    .then(doc=>{
        console.log(doc);
    })          
    .catch(err=>{  
        console.log(`@@ERRROR 💣  ${err}`);
    })

//Server
const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('App running on port ');
});
 
