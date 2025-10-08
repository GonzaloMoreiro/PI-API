import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductCategory1759925735091 implements MigrationInterface {
    name = 'UpdateProductCategory1759925735091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c3932231d2385ac248d0888d955"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "categoryId" TO "category"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c3932231d2385ac248d0888d955" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
