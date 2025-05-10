import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyCouponEntity1746851062050 implements MigrationInterface {
  name = 'ModifyCouponEntity1746851062050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coupons" ADD "is_public" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coupons" DROP COLUMN "is_public"`);
  }
}
