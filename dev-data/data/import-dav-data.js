// DOCUMENTAION
// import data -->  node import-dav-data.js --import
// delete data -->   node import-dav-data.js --deleateAll



const  fs  = require("fs");
const  mongoose  = require("mongoose");
const  dotenv  = require("dotenv");
const  Tour  = require("../../models/tourModel");

//envirament variable connection
dotenv.config({path:'../../config.env'});

//database connection
const DB=process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    .then(()=>console.log('DB connection successfull !'))

//GET FILE DATA
const data=JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));

//IMPORT DATA INTO DB 
const importData=async ()=>{
    try{       
        await  Tour.create(data)
        console.log('succsessfully imported ');
    }catch(err){
        console.log(err);
    }
        
} 

const deleateData=async ()=>{
    try{
           await Tour.deleteMany();
           console.log('Data successfully deleated');
    }
    catch(err){
        console.log(err);
    }
}


if(process.argv[2]=='--import'){
    importData();
}
if(process.argv[2]=='--deleateAll'){
    deleateData();
}


