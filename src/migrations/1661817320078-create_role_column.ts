import {MigrationInterface, QueryRunner} from "typeorm";

export class createRoleColumn1661817320078 implements MigrationInterface {
    name = 'createRoleColumn1661817320078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
