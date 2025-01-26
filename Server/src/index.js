import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { authenticateToken } from './middlewares/authMiddleware.js';
import {connectDB} from './utils/db.js';
import path from 'path';
import CustomError from './utils/CustomError.js';
import globalErrorHandler from './controllers/errorController.js'

dotenv.config({path: path.resolve('src/config/.env')});
const HTTP_PORT = process.env.HTTP_PORT || 3003;

const adminRoute = "/api/admin";
const clientRoute = "/api/client";
const userRoute = "/api/user";

process.on('uncaughtException',(err) =>{
    console.log(err.name,err.message);
    console.log("Uncaught Exception occured! Shutting down ...");
    process.exit(1);
})

process.on('unhandledRejection',(err) =>{
    console.log(err.name,err.message);
    console.log("Unhandled Rejection occured! Shutting down ...");
    process.exit(1);
})

const app = express();
connectDB(app);

app.use(cors({
    origin:"NO LO SE POR EL MOMENTO XD",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], //Investigar mas sobre los headers de CORS
}));

app.use(express.json());
app.use(adminRoute,authenticateToken,adminRoutes);
app.use(clientRoute,authenticateToken,clientRoutes);
app.use(userRoute,userRoutes);
app.all('*',(req,res,next) =>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!!!`, 404);
    next(err);
}); //Every route that doesnt exist will be here

app.use(globalErrorHandler);


app.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});