import {MigrationInterface, QueryRunner} from "typeorm";

export class isSyncedColumn1663603039792 implements MigrationInterface {
    name = 'isSyncedColumn1663603039792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_synced" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_synced"`);
    }

}
