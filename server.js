const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on('uncaughtException',err=>{
    process.exit(1);
});

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
    // console.log( 'db connection successfull !'); //  Normal Way
    console.log('\x1b[36m%s\x1b[0m', 'db connection successfull !');
});
     

// console.log(x);

// const testTour=new Tour({
//     name:'The hello world',
//     rating:4.9,
//     price:499,
// });
// const testTour=new Tour({     
//     name:'The hello world 2',    
//     price:499,
// });
// // SAVE 
// testTour
//     .save()
//     .then(doc=>{
//         console.log(doc);
//     })          
//     .catch(err=>{  
//         console.log(`@@ERRROR 💣  ${err}`);
//     })   
 
//Server 
const port=process.env.PORT || 8000;
const server=app.listen(port,()=>{
    console.log('App running on port ');
});
 
process.on('unhandledRejection',err=>{

    console.log(err);
    console.log(` !!!!!!! unhandledRejection`);

    server.close(()=>{
        process.exit(1);
    });

});
