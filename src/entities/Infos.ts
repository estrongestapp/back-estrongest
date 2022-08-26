import {
    Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column,
} from 'typeorm';
import User from './User';

@Entity('infos')
export default class Infos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    week: number;

    @Column({ type: 'int', nullable: true })
    exercicio: number;

    @Column({ type: 'simple-json', nullable: true })
    alimento: { [dia: string]: boolean };

    @Column({ type: 'simple-json', nullable: true })
    agua: { [dia: string]: boolean };

    @Column({ type: 'int', nullable: true })
    estudo: number;

    @Column({ type: 'int', nullable: true })
    leitura: number;

    @Column({ type: 'simple-json', nullable: true })
    notas: { materia: string, nota: number }[];

    @Column({ type: 'simple-json', nullable: true })
    internet: { [dia: string]: number };

    @Column({ type: 'boolean', nullable: true })
    namoro: boolean;

    @Column({ type: 'boolean', nullable: true })
    reuniao: boolean;

    @Column({ type: 'boolean', nullable: true })
    game: boolean;

    @Column({ type: 'boolean', nullable: true })
    culto: boolean;

    @Column({ type: 'text', nullable: true })
    ministerio: string;

    @Column({ type: 'text', nullable: true })
    live: string;

    @Column({ type: 'simple-json', nullable: true })
    tarefa: { [dia: string]: boolean };

    @Column({ type: 'simple-json', nullable: true })
    boaAcao: string[];

    @ManyToOne(() => User, (user) => user.id, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}