"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.login = exports.insertUser = void 0;
const Infos_1 = __importDefault(require("../entities/Infos"));
const service = __importStar(require("../services/userService"));
function insertUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info('Iniciando inserção de usuário');
            yield service.insertUser(req.body);
            return res.sendStatus(201);
        }
        catch (error) {
            console.error(error.name);
            if (error.name === 'ValidationError')
                return res.status(400).send(error.message);
            if (error.name === 'ConflictError')
                return res.status(409).send(error.message);
            return res.status(500).send('Erro desconhecido!');
        }
    });
}
exports.insertUser = insertUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info('Tentando fazer login');
            const { login, senha, admin } = req.body;
            const { user, token } = yield service.login(login, senha, admin);
            if (user.isSynced) {
                const infos = yield Infos_1.default.getInfos(user);
                return res.status(200).send({
                    login: user.login,
                    nome: user.nome,
                    token,
                    isSynced: user.isSynced,
                    infos
                });
            }
            else {
                return res.status(200).send({
                    login: user.login,
                    nome: user.nome,
                    token,
                    isSynced: user.isSynced,
                });
            }
        }
        catch (error) {
            console.error(error);
            if (error.name === 'ValidationError')
                return res.status(400).send(error.message);
            if (error.name === 'NotFoundError')
                return res.status(404).send(error.message);
            if (error.name === 'ForbiddenError')
                return res.status(403).send(error.message);
            return res.status(500).send('Erro desconhecido!');
        }
    });
}
exports.login = login;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield service.getUsers();
            return res.status(200).send(users.map((user) => user.login));
        }
        catch (error) {
            console.error(error);
            return res.send(500).send(`Erro: ${error.message}`);
        }
    });
}
exports.getUsers = getUsers;
