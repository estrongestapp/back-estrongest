import {
    BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

export interface NewUser {
    login: string;
    senha: string;
    nome: string;
}

@Entity('sessions')
export default class Session extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer' })
    readonly id: number;

    @Column({ type: 'text', unique: true })
    token: string;

    @OneToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    static async insertSession(user: User) {
        const token = uuid();
        await this.upsert(
            [
                { token, user },
            ],
            ['user']
        );

        return token;
    }
}