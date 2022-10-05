import {
    BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column,
} from 'typeorm';
import User from './User';

export interface NewInfos {
    user: {
        id: number;
    };
    week: number;
    exercicio?: number;
    alimento?: { [dia: string]: boolean };
    agua?: { [dia: string]: boolean };
    estudo?: number;
    leitura?: number;
    notas?: { materia: string, nota: number }[];
    internet?: { [dia: string]: number };
    namoro?: boolean;
    reuniao?: boolean;
    game?: boolean;
    culto?: boolean;
    ministerio?: string;
    live?: string;
    tarefa?: { [dia: string]: boolean };
    boaAcao?: string[];
}

@Entity('infos')
export default class Infos extends BaseEntity {
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

    static async insertInfos(info: NewInfos): Promise<void> {
        const infos = await this.findOne({
            week: info.week,
            user: {
                id: info.user.id,
            },
        });

        if (infos) return;

        const newInfos = this.create(info);
        await newInfos.save();
    }
    

    static async getInfos(user: User) {
        const infos = await this.find({
            user: {
                id: user.id,
            },
        });

        const mappedInfos: any = {};
        infos.forEach((info) => {
            delete info.id;
            delete info.user;
            const week = info.week;
            delete info.week;

            mappedInfos[week] = info;
        });

        return mappedInfos;
    }
}