import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config.js';

import authRouter from './routes/auth.routes.js';
import todoRouter from './routes/todo.routes.js';

const app = express();

// Allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://todomern-sigma.vercel.app'
];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`❌ CORS blocked request from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browsers (IE11, etc.)
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse cookies
app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());

// Connect to the database
await connectDB();

// API routes
app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

// Health check
app.get('/', (req, res) => res.send("Server Working..."));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
