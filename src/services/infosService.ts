import InfosRepository, { NewInfos } from "../entities/Infos";
import UserRepository from "../entities/User";

import { BadRequestError } from "../errors";
import { validateSession } from "./sessionService";

interface NewInfosBody {
    user: {
        login: string;
        token: string;
    };
    infos: {
        [week: number]: {
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
    }
}

export async function insertInfos(newInfos: NewInfosBody): Promise<void> {
    if (!newInfos.user) throw new BadRequestError('Você passar um usuário!');
    if (!newInfos.infos) throw new BadRequestError('Você não tem informações para salvar!');

    const { token, login } = newInfos.user;
    const user = await validateSession(token, login);

    for (const week of Object.keys(newInfos.infos)) {
        const weekInfos = newInfos.infos[Number(week)];

        await InfosRepository.insertInfos({
            ...weekInfos,
            week: Number(week),
            user: {
                id: user.id,
            }
        });
    }

    if (!user.isSynced) {
        await UserRepository.syncUser(user);
    }
}