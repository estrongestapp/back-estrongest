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
exports.validateAdminSession = exports.validateSession = void 0;
const Session_1 = __importDefault(require("../entities/Session"));
const errors_1 = require("../errors");
function validateSession(token, login) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield Session_1.default.getSession(token);
        if (!session || session.user.login !== login) {
            throw new errors_1.ForbiddenError('Sessão inválida, saia e faça o login novamente!');
        }
        return session.user;
    });
}
exports.validateSession = validateSession;
function validateAdminSession(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield Session_1.default.getSession(token);
        if (!session) {
            throw new errors_1.ForbiddenError('Sessão inválida, saia e faça o login novamente!');
        }
        if (session.user.role !== 'admin') {
            throw new errors_1.ForbiddenError('Você não tem permissão para isso!');
        }
        return session.user;
    });
}
exports.validateAdminSession = validateAdminSession;
