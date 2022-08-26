import {
    Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column,
} from 'typeorm';
import Infos from './Infos';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    login: string;

    @Column('text')
    senha: string;

    @Column({ type: 'text', unique: true })
    nome: string;

    @OneToMany(() => Infos, (infos) => infos.user)
    infos: Infos[];
}