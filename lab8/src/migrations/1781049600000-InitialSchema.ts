import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1781049600000 implements MigrationInterface {
  name = 'InitialSchema1781049600000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" text, "status" character varying(20) NOT NULL DEFAULT 'pending', "priority" character varying(10) NOT NULL DEFAULT 'medium', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_tags_name" UNIQUE ("name"), CONSTRAINT "PK_tags_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_tags" ("taskId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_task_tags" PRIMARY KEY ("taskId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_task_tags_taskId" ON "task_tags" ("taskId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_task_tags_tagId" ON "task_tags" ("tagId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_tags" ADD CONSTRAINT "FK_task_tags_taskId" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_tags" ADD CONSTRAINT "FK_task_tags_tagId" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_tags" DROP CONSTRAINT "FK_task_tags_tagId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_tags" DROP CONSTRAINT "FK_task_tags_taskId"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_task_tags_tagId"`);
    await queryRunner.query(`DROP INDEX "IDX_task_tags_taskId"`);
    await queryRunner.query(`DROP TABLE "task_tags"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
