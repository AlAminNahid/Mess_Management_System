import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPerformanceIndexes1784569609267 implements MigrationInterface {
    name = 'AddPerformanceIndexes1784569609267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_87fe2f1db7ea332e1cdcd653e8" ON "meal_expense_iterations" ("member_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d1f9a78639474923264440635" ON "meal_expense_iterations" ("date") `);
        await queryRunner.query(`CREATE INDEX "IDX_c33a01563169fe1d5e18b173ef" ON "notices" ("posted_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_15499bc2e164b5db1eba7b9826" ON "notices" ("member_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_82467c8fadd30272f8b884e1de" ON "meals" ("member_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_892cc9ee5ea07cf68f4da39542" ON "meals" ("date") `);
        await queryRunner.query(`CREATE INDEX "IDX_fdf0fec051156faf1708afeeee" ON "members" ("mess_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_da404b5fd9c390e25338996e2d" ON "members" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7150119e0bf66788f072312c4" ON "utility_costs" ("mess_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_560cb27f1826bd22638e2be170" ON "utility_costs" ("date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_560cb27f1826bd22638e2be170"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7150119e0bf66788f072312c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da404b5fd9c390e25338996e2d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fdf0fec051156faf1708afeeee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_892cc9ee5ea07cf68f4da39542"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82467c8fadd30272f8b884e1de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15499bc2e164b5db1eba7b9826"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c33a01563169fe1d5e18b173ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d1f9a78639474923264440635"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87fe2f1db7ea332e1cdcd653e8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    }

}
