import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import './database';

const app: Application = express();

//env
dotenv.config();

//settings
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes);

export default app;