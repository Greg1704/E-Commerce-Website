import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({path: 'config/.env'});
const HTTP_PORT = process.env.HTTP_PORT || 3003;

const app = express();

app.use(cors({
    origin:"NO LO SE POR EL MOMENTO XD",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], //Investigar mas sobre los headers de CORS
}));

app.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});