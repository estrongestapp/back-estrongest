"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../errors");
const UserSchema = joi_1.default.object({
    login: joi_1.default.string().min(3).max(20).required()
        .error(new errors_1.ValidationError('O nome de usuário deve ter entre 3 e 20 caracteres!')),
    senha: joi_1.default.string().min(4).max(10).required()
        .error(new errors_1.ValidationError('A senha deve ter entre 4 e 10 caracteres!')),
    nome: joi_1.default.string().min(3).required()
        .error(new errors_1.ValidationError('O nome precisa ter pelo menos 3 letras!')),
});
exports.default = UserSchema;
