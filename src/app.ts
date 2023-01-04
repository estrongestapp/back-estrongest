import './setup';
import express, { Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';

import userRouter from './routers/userRouter';
import infosRouter from './routers/infosRouter';

import connectDatabase from './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/user', userRouter);
app.use('/infos', infosRouter);
app.get('/health', (request: Request, res: Response) => res.send('Ok!'));

export async function init() {
    await connectDatabase();
}

export default app;