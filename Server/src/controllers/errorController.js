import CustomError from "../utils/CustomError.js";

const devErrors = (res,error) =>{
    console.log("/kill please")
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error:error
    });
}

const prodErrors = (res,error) => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }else{
        res.status(500).json({
            status: 'error',
            message:'Something went wrong! Please try again later.'
        });
    }
}

const MongooseErrorHandler = (error) =>{
    const msg = error.stack.split("\n")[0].split(":")[1].slice(1) + "."; //This line extracts the message from the MongooseError
    return new CustomError(msg,400);
}

const ValidationErrorHandler = (error) =>{
    const errors = Object.values(error.errors).map(val => val.message);
    const errorMessages = errors.join('.') + ".";
    const msg = `Invalid input data ${errorMessages}`;
    return new CustomError(msg,400);
}

export default (error,req,res,next) => { //Esto es temporal, pero ta bueno para aprender xd
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        devErrors(res,error);
    }else if(process.env.NODE_ENV === 'production'){
        if(error.name === 'MongooseError'){
            error = MongooseErrorHandler(error);
        }else if(error.name === 'ValidationError'){
            error = ValidationErrorHandler(error);
        }
        prodErrors(res,error);
    }
};