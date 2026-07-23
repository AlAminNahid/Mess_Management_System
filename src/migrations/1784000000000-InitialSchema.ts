import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1784000000000 implements MigrationInterface {
    name = 'InitialSchema1784000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nid" character varying(14) NOT NULL, "phone" character varying NOT NULL, "avater" character varying, "hashedRefreshToken" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_b4cb829390106ed6a21bb04969e" UNIQUE ("nid"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal_expense_iterations" ("id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "manager_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "member_id" integer, CONSTRAINT "PK_c43e5035480385f59e4546dda53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87fe2f1db7ea332e1cdcd653e8" ON "meal_expense_iterations" ("member_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d1f9a78639474923264440635" ON "meal_expense_iterations" ("date") `);
        await queryRunner.query(`CREATE TYPE "public"."notices_notice_type_enum" AS ENUM('annoucement', 'shopping_request', 'meal_report', 'off_meal', 'other')`);
        await queryRunner.query(`CREATE TABLE "notices" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying NOT NULL, "posted_date" TIMESTAMP NOT NULL DEFAULT now(), "notice_type" "public"."notices_notice_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "member_id" integer, CONSTRAINT "PK_3eb18c29da25d6935fcbe584237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c33a01563169fe1d5e18b173ef" ON "notices" ("posted_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_15499bc2e164b5db1eba7b9826" ON "notices" ("member_id") `);
        await queryRunner.query(`CREATE TABLE "meals" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "meal_type" character varying(20) NOT NULL DEFAULT 'Lunch', "meal_count" integer NOT NULL DEFAULT '0', "manager_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "member_id" integer, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_82467c8fadd30272f8b884e1de" ON "meals" ("member_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_892cc9ee5ea07cf68f4da39542" ON "meals" ("date") `);
        await queryRunner.query(`CREATE TYPE "public"."members_is_active_enum" AS ENUM('true', 'false')`);
        await queryRunner.query(`CREATE TYPE "public"."members_role_enum" AS ENUM('manager', 'member', 'user')`);
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "is_active" "public"."members_is_active_enum" NOT NULL DEFAULT 'true', "role" "public"."members_role_enum" NOT NULL DEFAULT 'user', "leave_date" TIMESTAMP, "join_date" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mess_id" integer, "user_id" integer, CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fdf0fec051156faf1708afeeee" ON "members" ("mess_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_da404b5fd9c390e25338996e2d" ON "members" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."messes_is_active_enum" AS ENUM('true', 'false')`);
        await queryRunner.query(`CREATE TABLE "messes" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, "is_active" "public"."messes_is_active_enum" NOT NULL DEFAULT 'true', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_121eda5375ac1c6179998a2f674" UNIQUE ("name"), CONSTRAINT "PK_043828fe17897e73eda8af683c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "utility_costs" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "internet" numeric(10,2) NOT NULL, "electricity" numeric(10,2) NOT NULL, "maid" numeric(10,2) NOT NULL, "gas" numeric(10,2) NOT NULL, "manager_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mess_id" integer, CONSTRAINT "PK_45a782cf0f14622fab1d2120971" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7150119e0bf66788f072312c4" ON "utility_costs" ("mess_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_560cb27f1826bd22638e2be170" ON "utility_costs" ("date") `);
        await queryRunner.query(`ALTER TABLE "meal_expense_iterations" ADD CONSTRAINT "FK_87fe2f1db7ea332e1cdcd653e8d" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notices" ADD CONSTRAINT "FK_15499bc2e164b5db1eba7b98268" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_82467c8fadd30272f8b884e1de3" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_fdf0fec051156faf1708afeeeed" FOREIGN KEY ("mess_id") REFERENCES "messes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_da404b5fd9c390e25338996e2d1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility_costs" ADD CONSTRAINT "FK_e7150119e0bf66788f072312c4b" FOREIGN KEY ("mess_id") REFERENCES "messes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "utility_costs" DROP CONSTRAINT "FK_e7150119e0bf66788f072312c4b"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_da404b5fd9c390e25338996e2d1"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_fdf0fec051156faf1708afeeeed"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_82467c8fadd30272f8b884e1de3"`);
        await queryRunner.query(`ALTER TABLE "notices" DROP CONSTRAINT "FK_15499bc2e164b5db1eba7b98268"`);
        await queryRunner.query(`ALTER TABLE "meal_expense_iterations" DROP CONSTRAINT "FK_87fe2f1db7ea332e1cdcd653e8d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_560cb27f1826bd22638e2be170"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7150119e0bf66788f072312c4"`);
        await queryRunner.query(`DROP TABLE "utility_costs"`);
        await queryRunner.query(`DROP TABLE "messes"`);
        await queryRunner.query(`DROP TYPE "public"."messes_is_active_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da404b5fd9c390e25338996e2d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fdf0fec051156faf1708afeeee"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TYPE "public"."members_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."members_is_active_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_892cc9ee5ea07cf68f4da39542"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82467c8fadd30272f8b884e1de"`);
        await queryRunner.query(`DROP TABLE "meals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15499bc2e164b5db1eba7b9826"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c33a01563169fe1d5e18b173ef"`);
        await queryRunner.query(`DROP TABLE "notices"`);
        await queryRunner.query(`DROP TYPE "public"."notices_notice_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d1f9a78639474923264440635"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87fe2f1db7ea332e1cdcd653e8"`);
        await queryRunner.query(`DROP TABLE "meal_expense_iterations"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
