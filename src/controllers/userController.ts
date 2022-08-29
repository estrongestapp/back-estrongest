import { Request, Response } from 'express';
import * as service from '../services/userService';

export async function insertUser(req: Request, res: Response) {
    try {
        await service.insertUser(req.body);

        return res.sendStatus(201);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'Conflict') return res.status(409).send(error.message);

        console.error(error);
        return res.status(500).send('Erro desconhecido!');
    }
}