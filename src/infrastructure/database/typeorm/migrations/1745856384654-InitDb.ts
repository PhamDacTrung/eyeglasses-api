import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1745856384654 implements MigrationInterface {
  name = 'InitDb1745856384654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "date_of_birth" date, "gender" character varying(20), "profession" character varying(100), "style" character varying(100), CONSTRAINT "UQ_a71db1054b3702f88d46d120345" UNIQUE ("user_id"), CONSTRAINT "REL_a71db1054b3702f88d46d12034" UNIQUE ("user_id"), CONSTRAINT "PK_dff10c2d65f58909fbd2f88bff5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'eyeglasses-db',
        'public',
        'users',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', email || ' ' || COALESCE(phone, ''))",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "name" character varying(255) NOT NULL, "phone" character varying, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', email || ' ' || COALESCE(phone, ''))) STORED, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_infos" ADD CONSTRAINT "FK_a71db1054b3702f88d46d120345" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_infos" DROP CONSTRAINT "FK_a71db1054b3702f88d46d120345"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'search_vector', 'eyeglasses-db', 'public', 'users'],
    );
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "user_infos"`);
  }
}
