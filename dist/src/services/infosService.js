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
exports.insertInfos = void 0;
const Infos_1 = __importDefault(require("../entities/Infos"));
const User_1 = __importDefault(require("../entities/User"));
const errors_1 = require("../errors");
const sessionService_1 = require("./sessionService");
function insertInfos(newInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!newInfos.user)
            throw new errors_1.BadRequestError('Você passar um usuário!');
        if (!newInfos.infos)
            throw new errors_1.BadRequestError('Você não tem informações para salvar!');
        const { token, login } = newInfos.user;
        const user = yield (0, sessionService_1.validateSession)(token, login);
        for (const week of Object.keys(newInfos.infos)) {
            const weekInfos = newInfos.infos[Number(week)];
            yield Infos_1.default.insertInfos(Object.assign(Object.assign({}, weekInfos), { week: Number(week), user: {
                    id: user.id,
                } }));
        }
        if (!user.isSynced) {
            yield User_1.default.syncUser(user);
        }
    });
}
exports.insertInfos = insertInfos;
