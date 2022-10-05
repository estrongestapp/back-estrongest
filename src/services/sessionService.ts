import SessionRepository from '../entities/Session';

import { ForbiddenError } from '../errors';

export async function validateSession(token: string, login: string) {
    const session = await SessionRepository.getSession(token);

    if (!session || session.user.login !== login) {
        throw new ForbiddenError('Sessão inválida, saia e faça o login novamente!');
    }

    return session.user;
}