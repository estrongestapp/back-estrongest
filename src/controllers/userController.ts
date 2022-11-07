import { Request, Response } from 'express';
import InfosRepository from '../entities/Infos';
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
        const { user, token } = await service.login(login, senha, admin);

        if (user.isSynced) {
            const infos = await InfosRepository.getInfos(user);

            return res.status(200).send({
                login: user.login,
                nome: user.nome,
                token,
                isSynced: user.isSynced,
                infos
            });
        } else {
            return res.status(200).send({
                login: user.login,
                nome: user.nome,
                token,
                isSynced: user.isSynced,
            });
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'NotFoundError') return res.status(404).send(error.message);
        if (error.name === 'ForbiddenError') return res.status(403).send(error.message);
        return res.status(500).send('Erro desconhecido!');
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await service.getUsers();

        return res.status(200).send(users.map((user) => user.login));
    } catch (error) {
        console.error(error);
        return res.send(500).send(`Erro: ${error.message}`);
    }
}