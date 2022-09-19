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

app.use('/user', userRouter);
app.use('/infos', infosRouter);
app.get('/health', (request: Request, res: Response) => res.send('Ok!'));

export async function init() {
    await connectDatabase();
}

export default app;