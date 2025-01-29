import jwt from 'jsonwebtoken';
import CustomError from "../utils/CustomError.js";


//Metodo el cual se encarga de autenticar el access token cada vez que llega una request
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Separamos el token del Bearer


    if (!token){
        const error = new CustomError('Access denied, lack of token',401);
        return next(error);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            const error = new CustomError('Invalid token',403);
            return next(error);
        }
        next();
    });
};