import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1661557153589 implements MigrationInterface {
    name = 'createTables1661557153589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "infos" ("id" SERIAL NOT NULL, "week" integer NOT NULL, "exercicio" integer, "alimento" text, "agua" text, "estudo" integer, "leitura" integer, "notas" text, "internet" text, "namoro" boolean, "reuniao" boolean, "game" boolean, "culto" boolean, "ministerio" text, "live" text, "tarefa" text, "boaAcao" text, "user_id" integer, CONSTRAINT "PK_be86029f65ae5c9d902e255013a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" text NOT NULL, "senha" text NOT NULL, "nome" text NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "UQ_b4f334ce4e8924c3560dd4ba1d6" UNIQUE ("nome"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_322db4e17996f6dc1b79b9956a9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_322db4e17996f6dc1b79b9956a9"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "infos"`);
    }

}
