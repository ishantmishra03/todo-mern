import express from 'express';
const app = express();

import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config.js';

import authRouter from './routes/auth.routes.js'

//CORS setup
const allowedOrigins = [
    'http://localhost:5173',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Origin allowed
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

//Configurations
app.use(cookieParser());

//Connect Database
await connectDB();

//Middlewares
app.use(express.json());

//Routes
app.use('/api/auth', authRouter);



//Check Up
app.get('/', (req, res) => { res.send("Server Woring...") });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) });