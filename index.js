import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'; // Import the cors middleware

import userRoutes from './routers/user.js';
import authRoutes from './routers/auth.js';
import postRoutes from './routers/posts.js'; // Corrected import path

dotenv.config();


const app = express();
const port = 8080;


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.use(express.json());
        app.use(helmet());
        app.use(morgan("common"));
        
        // Use cors middleware to allow cross-origin requests
        app.use(cors());

        app.use('/user/v1', userRoutes);
        app.use('/auth/v1', authRoutes);
        app.use('/posts/v1', postRoutes); // Corrected route path
        app.get('/', (req, res)=>{
            res.send("Welcome to Zain social media backend")
        })

        console.log("Successfully connected to DB");
        app.listen(port, () => {
            console.log(`Server is running on port number ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to DB:", error);
    });
