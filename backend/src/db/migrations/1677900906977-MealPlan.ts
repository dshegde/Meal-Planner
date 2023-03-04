import { MigrationInterface, QueryRunner } from "typeorm";

export class MealPlan1677900906977 implements MigrationInterface {
    name = 'MealPlan1677900906977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meal_plans" ("id" SERIAL NOT NULL, "mealId" integer NOT NULL, "mealType" character varying NOT NULL, "recipeId" integer NOT NULL, "dayOfWeek" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6270d3206d074e2a2520f8d0a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD CONSTRAINT "FK_1ce69a2fecf3cefd6a986c452c4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP CONSTRAINT "FK_1ce69a2fecf3cefd6a986c452c4"`);
        await queryRunner.query(`DROP TABLE "meal_plans"`);
    }

}
