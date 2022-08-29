import UserRepository, { NewUser } from "../entities/User";
import { UserSchema } from '../validations';

import { ValidationError } from '../errors';

export async function insertUser(newUser: NewUser): Promise<void> {
    const { error } = UserSchema.validate(newUser);

    if (!!error) {
        throw new ValidationError(error.message);
    }

    await UserRepository.insertUser(newUser);
}