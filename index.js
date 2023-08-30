import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import userroutes from './routers/user.js'
import authroutes from './routers/auth.js'
import postRoute from './routers/posts.js';

console.log("hello World");

const app = express();
const port = 8080;

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    // it is code when db is connected 
    .then(() => {

        // middle ware
        app.use(express.json());
        app.use(helmet());
        app.use(morgan("common"));

        app.use('/user/v1', userroutes)
        app.use('/auth/v1', authroutes)
        app.use("/posts/v1", postRoute);

        console.log("Successfully connected to DB");
        app.listen(port, () => {
            console.log(`Port is running on port number ${port}`);
        });
    })

    // it is code when db has error in connection
    .catch(error => {
        console.error("Error connecting to DB:", error);
});
