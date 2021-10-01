module.exports=(error,req,res,next)=>{
    // console.log(`***********************************`);
    // console.log('*******',error);
    // console.log(`***********************************`);
    console.log(1);
    error.statusCode= error.statusCode;
    error.status= error.status;
     res.status(error.statusCode).json({
        status:error.status,
        message:`${error.message}`
    });
    next();

};

