import {
    BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column,
} from 'typeorm';
import bcrypt from 'bcrypt';

import Infos from './Infos';

import { ValidationError, NotFoundError, ConflictError } from '../errors';

export interface NewUser {
    login: string;
    senha: string;
    nome: string;
}

@Entity('users')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer' })
    readonly id: number;

    @Column({ type: 'text', unique: true })
    login: string;

    @Column('text')
    senha: string;

    @Column({ type: 'text', unique: true })
    nome: string;

    @Column({ type: 'text', nullable: true })
    role: string;

    @Column({ name: 'is_synced', type: 'boolean', nullable: false, default: false })
    isSynced: boolean;

    @OneToMany(() => Infos, (infos) => infos.user)
    infos: Infos[];

    static async insertUser(newUserInformation: NewUser): Promise<void> {
        const user = await this.findOne({
            where: [
                { login: newUserInformation.login },
                { nome: newUserInformation.nome }
            ],
        });

        if (!!user) {
            const message = `Este ${user.nome === newUserInformation.nome ? 'nome' : 'login'} já está cadastrado! Tente outro.`;
            throw new ConflictError(message);
        }

        const hashSenha = bcrypt.hashSync(newUserInformation.senha, 10);

        const newUser = this.create({
            login: newUserInformation.login,
            senha: hashSenha,
            nome: newUserInformation.nome,
        })
        await newUser.save();
    }

    static async searchUserByLogin(login: string): Promise<User> {
        const user = await this.findOne({
            login
        });

        if (!user) {
            throw new NotFoundError('Login não encontrado!');
        }

        return user;
    }

    static checkPassword(passwordSent: string, user: User): void {
        const isPasswordCorrect = bcrypt.compareSync(passwordSent, user.senha);

        if (!isPasswordCorrect) {
            throw new ValidationError('Senha incorreta!');
        }
    }
}