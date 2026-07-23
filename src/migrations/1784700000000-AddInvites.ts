import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvites1784700000000 implements MigrationInterface {
    name = 'AddInvites1784700000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."invites_status_enum" AS ENUM('pending', 'accepted', 'declined')`);
        await queryRunner.query(`CREATE TABLE "invites" ("id" SERIAL NOT NULL, "status" "public"."invites_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mess_id" integer, "invited_user_id" integer, "invited_by_user_id" integer, CONSTRAINT "PK_invites_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_invites_mess_id" ON "invites" ("mess_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_invites_invited_user_id" ON "invites" ("invited_user_id")`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_invites_mess" FOREIGN KEY ("mess_id") REFERENCES "messes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_invites_invited_user" FOREIGN KEY ("invited_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_invites_invited_by_user" FOREIGN KEY ("invited_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_invites_invited_by_user"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_invites_invited_user"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_invites_mess"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_invites_invited_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_invites_mess_id"`);
        await queryRunner.query(`DROP TABLE "invites"`);
        await queryRunner.query(`DROP TYPE "public"."invites_status_enum"`);
    }
}
