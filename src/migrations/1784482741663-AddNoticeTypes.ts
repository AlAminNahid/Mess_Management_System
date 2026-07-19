import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNoticeTypes1784482741663 implements MigrationInterface {
  name = 'AddNoticeTypes1784482741663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "notices_notice_type_enum" ADD VALUE IF NOT EXISTS 'meal_report'`,
    );
    await queryRunner.query(
      `ALTER TYPE "notices_notice_type_enum" ADD VALUE IF NOT EXISTS 'off_meal'`,
    );
    await queryRunner.query(
      `ALTER TYPE "notices_notice_type_enum" ADD VALUE IF NOT EXISTS 'other'`,
    );
  }

  public async down(): Promise<void> {
    // Postgres does not support dropping individual enum values, so this
    // migration is not reversible without recreating the enum type.
  }
}
