import Joi from "joi";
import { ValidationError } from "../errors";

const UserSchema = Joi.object({
    login: Joi.string().min(3).max(20).required()
        .error(new ValidationError('O nome de usuário deve ter entre 3 e 20 caracteres!')),
    senha: Joi.string().min(4).max(10).required()
        .error(new ValidationError('A senha deve ter entre 4 e 10 caracteres!')),
    nome: Joi.string().min(3).required()
        .error(new ValidationError('O nome precisa ter pelo menos 5 letras!')),
});

export default UserSchema;