import UserRepository, { NewUser } from "../entities/User";
import SessionRepository from "../entities/Session";
import { UserSchema } from '../validations';

import { ValidationError, ForbiddenError } from '../errors';

export async function insertUser(newUser: NewUser): Promise<void> {
    const { error } = UserSchema.validate(newUser);

    if (!!error) {
        throw new ValidationError(error.message);
    }

    await UserRepository.insertUser(newUser);
}

export async function login(login: string, senha: string, admin: boolean) {
    const user = await UserRepository.searchUserByLogin(login);

    UserRepository.checkPassword(senha, user);

    if (admin && user.role !== 'admin') {
        throw new ForbiddenError('Você não é um administrador!');
    }

    const newSession = await SessionRepository.insertSession(user);

    return {
        user,
        token: newSession,
    };
}

export async function getUsers(): Promise<UserRepository[]> {
    const users = await UserRepository.find();

    return users;
}

export async function changePassword(newPassword: string, token: string): Promise<void> {
    const session = await SessionRepository.getSession(token);

    if (!session) {
        throw new Error('Token inválido!');
    }

    await UserRepository.changePassword(newPassword, session.user);
    await SessionRepository.invalidateSession(session.user);
}