import SessionRepository from '../entities/Session';

import { ForbiddenError } from '../errors';

export async function validateSession(token: string, login: string) {
    const session = await SessionRepository.getSession(token);

    if (!session || session.user.login !== login) {
        throw new ForbiddenError('Sessão inválida, saia e faça o login novamente!');
    }

    return session.user;
}

export async function validateAdminSession(token: string) {
    const session = await SessionRepository.getSession(token);

    if (!session) {
        throw new ForbiddenError('Sessão inválida, saia e faça o login novamente!');
    }
    if (session.user.role !== 'admin') {
        throw new ForbiddenError('Você não tem permissão para isso!');
    }

    return session.user;
}