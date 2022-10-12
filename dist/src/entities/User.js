"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Infos_1 = __importDefault(require("./Infos"));
const errors_1 = require("../errors");
let User = class User extends typeorm_1.BaseEntity {
    static insertUser(newUserInformation) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: [
                    { login: newUserInformation.login },
                    { nome: newUserInformation.nome }
                ],
            });
            if (!!user) {
                const message = `Este ${user.nome === newUserInformation.nome ? 'nome' : 'login'} já está cadastrado! Tente outro.`;
                throw new errors_1.ConflictError(message);
            }
            const hashSenha = bcrypt_1.default.hashSync(newUserInformation.senha, 10);
            const newUser = this.create({
                login: newUserInformation.login,
                senha: hashSenha,
                nome: newUserInformation.nome,
            });
            yield newUser.save();
        });
    }
    static searchUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                login
            });
            if (!user) {
                throw new errors_1.NotFoundError('Login não encontrado!');
            }
            return user;
        });
    }
    static checkPassword(passwordSent, user) {
        const isPasswordCorrect = bcrypt_1.default.compareSync(passwordSent, user.senha);
        if (!isPasswordCorrect) {
            throw new errors_1.ValidationError('Senha incorreta!');
        }
    }
    static syncUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update(user.id, { isSynced: true });
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_synced', type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isSynced", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Infos_1.default, (infos) => infos.user),
    __metadata("design:type", Array)
], User.prototype, "infos", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.default = User;
