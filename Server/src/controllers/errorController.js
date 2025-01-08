export default (error,req,res,next) => { //Esto es temporal, pero ta bueno para aprender xd
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
};