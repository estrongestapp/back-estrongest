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
const lodash_1 = __importDefault(require("lodash"));
const User_1 = __importDefault(require("./User"));
let Infos = class Infos extends typeorm_1.BaseEntity {
    static insertInfos(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const infos = yield this.findOne({
                week: info.week,
                user: {
                    id: info.user.id,
                },
            });
            if (infos)
                return;
            const newInfos = this.create(info);
            yield newInfos.save();
        });
    }
    static getInfos(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const infos = yield this.find({
                user: {
                    id: user.id,
                },
            });
            const mappedInfos = {};
            infos.forEach((info) => {
                delete info.id;
                delete info.user;
                const week = info.week;
                delete info.week;
                mappedInfos[week] = info;
            });
            return mappedInfos;
        });
    }
    static getAllInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            const infos = yield this.find({});
            const groupedInfos = lodash_1.default.groupBy(infos, 'user.nome');
            for (const user of Object.keys(groupedInfos)) {
                for (const week of groupedInfos[user]) {
                    delete week.user;
                }
            }
            return groupedInfos;
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Infos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Infos.prototype, "week", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Infos.prototype, "exercicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Infos.prototype, "alimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Infos.prototype, "agua", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Infos.prototype, "estudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Infos.prototype, "leitura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], Infos.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Infos.prototype, "internet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Infos.prototype, "namoro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Infos.prototype, "reuniao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Infos.prototype, "game", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Infos.prototype, "culto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Infos.prototype, "ministerio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Infos.prototype, "live", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Infos.prototype, "tarefa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], Infos.prototype, "boaAcao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, (user) => user.id, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.default)
], Infos.prototype, "user", void 0);
Infos = __decorate([
    (0, typeorm_1.Entity)('infos')
], Infos);
exports.default = Infos;
