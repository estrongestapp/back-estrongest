"use strict";
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
exports.changePassword = exports.getUsers = exports.login = exports.insertUser = void 0;
const User_1 = __importDefault(require("../entities/User"));
const Session_1 = __importDefault(require("../entities/Session"));
const validations_1 = require("../validations");
const errors_1 = require("../errors");
function insertUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = validations_1.UserSchema.validate(newUser);
        if (!!error) {
            throw new errors_1.ValidationError(error.message);
        }
        yield User_1.default.insertUser(newUser);
    });
}
exports.insertUser = insertUser;
function login(login, senha, admin) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.searchUserByLogin(login);
        User_1.default.checkPassword(senha, user);
        if (admin && user.role !== 'admin') {
            throw new errors_1.ForbiddenError('Você não é um administrador!');
        }
        const newSession = yield Session_1.default.insertSession(user);
        return {
            user,
            token: newSession,
        };
    });
}
exports.login = login;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.default.find();
        return users;
    });
}
exports.getUsers = getUsers;
function changePassword(newPassword, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield Session_1.default.getSession(token);
        if (!session) {
            throw new Error('Token inválido!');
        }
        yield User_1.default.changePassword(newPassword, session.user);
        yield Session_1.default.invalidateSession(session.user);
    });
}
exports.changePassword = changePassword;
