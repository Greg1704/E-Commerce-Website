import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { authenticateToken } from './middlewares/authMiddleware.js';
import mongoose from 'mongoose';


dotenv.config({path: 'config/.env'});
const HTTP_PORT = process.env.HTTP_PORT || 3003;

const adminRoute = "/api/user";
const clientRoute = "/api/client";
const userRoute = "/api/user";

const app = express();
mongoose.connect('mongodb://localhost:27017/e-commerce');

app.use(cors({
    origin:"NO LO SE POR EL MOMENTO XD",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], //Investigar mas sobre los headers de CORS
}));

app.use(adminRoute,authenticateToken,adminRoutes);
app.use(clientRoute,authenticateToken,clientRoutes);
app.use(userRoute,userRoutes);

app.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});