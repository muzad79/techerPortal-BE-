import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.mjs';
import teacherRoutes from './routes/teacherRoutes.mjs';
import { authenticate } from './middlewares/authMiddleware.mjs';
import { passAuthenticate } from './middlewares/passportMiddleware.mjs';
const app=express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'));
mongoose.connect(process.env.MONGO_URI || '');

// Auth Routes
app.use('/auth', authRoutes);
app.use('/teacher',authenticate, teacherRoutes);
app.get("/",(req,res)=>{
    res.send("WELCOME TO Teacher Portal Server")
})
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is runnung at http://localhost:${port}`)
})