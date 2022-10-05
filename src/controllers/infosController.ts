import { Request, Response } from 'express';
import * as service from '../services/infosService';

export async function insertInfos(req: Request, res: Response) {
    try {
        await service.insertInfos(req.body);

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError' || error.name === 'BadRequestError') return res.status(400).send(error.message);
        if (error.name === 'NotFoundError') return res.status(404).send(error.message);
        if (error.name === 'ForbiddenError') return res.status(403).send(error.message);
        return res.status(500).send(error.message);
    }
}