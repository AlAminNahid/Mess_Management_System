import { MigrationInterface, QueryRunner } from "typeorm";

export class DropNidColumn1784500000000 implements MigrationInterface {
    name = 'DropNidColumn1784500000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "UQ_b4cb829390106ed6a21bb04969e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "nid" character varying(14)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_b4cb829390106ed6a21bb04969e" UNIQUE ("nid")`);
    }
}
