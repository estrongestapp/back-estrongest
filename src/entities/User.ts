import {
    BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Infos from './Infos';

import { ValidationError } from '../errors';

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
            throw new ValidationError(message);
        }

        const hashSenha = bcrypt.hashSync(newUserInformation.senha, 10);

        const newUser = this.create({
            login: newUserInformation.login,
            senha: hashSenha,
            nome: newUserInformation.nome,
        })
        await newUser.save();
    }
}