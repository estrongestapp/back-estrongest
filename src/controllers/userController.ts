import { Request, Response } from 'express';
import * as service from '../services/userService';

export async function insertUser(req: Request, res: Response) {
    try {
        console.info('Iniciando inserção de usuário');
        await service.insertUser(req.body);

        return res.sendStatus(201);
    } catch (error) {
        console.error(error.name);
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'ConflictError') return res.status(409).send(error.message);
        return res.status(500).send('Erro desconhecido!');
    }
}

export async function login(req: Request, res: Response) {
    try {
        console.info('Tentando fazer login');
        const { login, senha, admin } = req.body;
        const user = await service.login(login, senha, admin);

        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'NotFoundError') return res.status(404).send(error.message);
        return res.status(500).send('Erro desconhecido!');
    }
}