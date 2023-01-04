import './setup';
import express, { Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';

import userRouter from './routers/userRouter';
import infosRouter from './routers/infosRouter';

import connectDatabase from './database';

const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    app.use(cors());
    next();
});
app.use(express.json());

app.use('/user', userRouter);
app.use('/infos', infosRouter);
app.get('/health', (request: Request, res: Response) => res.send('Ok!'));

export async function init() {
    await connectDatabase();
}

export default app;