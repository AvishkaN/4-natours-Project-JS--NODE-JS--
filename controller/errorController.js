const AppError = require("../utils/appError");

const sendErrorDevelopment=(res,error)=>{
    
        res.status(error.statusCode).json({
           status:error.status,
           error:error,
           message:` ${error.message}`,
           stacks:error.stack,
       });

};
const handleCastErrorDB=(error)=>{
    const message= `invalid ID ${error.path} : ${error.value}`
   return  new AppError(message,400)

};
const handleDuplicateFields=(error)=>{
    const value=error.keyValue.name;
    const message= `duplicate field value : / ${value} / Please use another value !`
   return  new AppError(message,400)

};
const handleJWTError=()=>  new AppError('Invalid token .please log in again',401);

const handleJWTExpiredError=()=>  new AppError('your token has expired ! please log in again',401);

const handleValidateFields=(error)=>{
    const value=Object.values(error.errors).map(el=>el.message).join(' .');
    const message=`Invalid input data. ${value}`;
   return  new AppError(message,400)
};


const sendErrorProduction=(res,error)=>{



    if(error.isOperational){
        res.status(error.statusCode).json({
            status:error.status,
            message:`${error.message}`
        });
    }else{ 
        res.status(500).json({
            status:"error",
            message:`Something went wrong`
        });
    }
    

};



module.exports=(error,req,res,next)=>{
    error.statusCode= error.statusCode || 500;
    error.status= error.status;
   
    // development error
    if(process.env.NODE_ENV=='development'){
        sendErrorDevelopment(res,error);
    }
  

    // production error
    if(process.env.NODE_ENV=='production'){
        let err={...error};
 
        //create meaningfull error
        if(error.name==='CastError')err=handleCastErrorDB(err);  //convert to operational error
        if(error.code===11000)err=handleDuplicateFields(err);  //convert to operational error
        if(error.name==='ValidationError')err=handleValidateFields(err);  //convert to operational error
        if(error.name==='JsonWebTokenError')err=handleJWTError(err);  //convert to operational error
        if(error.name==='TokenExpiredError')err=handleJWTExpiredError(err);  //convert to operational error
        sendErrorProduction(res,err)
    }

    next();
 
};

