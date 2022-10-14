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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables1661557153589 = void 0;
class createTables1661557153589 {
    constructor() {
        this.name = 'createTables1661557153589';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "infos" ("id" SERIAL NOT NULL, "week" integer NOT NULL, "exercicio" integer, "alimento" text, "agua" text, "estudo" integer, "leitura" integer, "notas" text, "internet" text, "namoro" boolean, "reuniao" boolean, "game" boolean, "culto" boolean, "ministerio" text, "live" text, "tarefa" text, "boaAcao" text, "user_id" integer, CONSTRAINT "PK_be86029f65ae5c9d902e255013a" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" text NOT NULL, "senha" text NOT NULL, "nome" text NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "UQ_b4f334ce4e8924c3560dd4ba1d6" UNIQUE ("nome"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_322db4e17996f6dc1b79b9956a9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_322db4e17996f6dc1b79b9956a9"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "infos"`);
        });
    }
}
exports.createTables1661557153589 = createTables1661557153589;
