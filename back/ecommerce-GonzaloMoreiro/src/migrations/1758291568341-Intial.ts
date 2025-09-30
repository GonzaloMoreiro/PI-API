import { MigrationInterface, QueryRunner } from 'typeorm';

export class Intial1758291568341 implements MigrationInterface {
  name = 'Intial1758291568341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png', "category" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "REL_bb1ea956e38abca70b9a0d2c64" UNIQUE ("orderId"), CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(80) NOT NULL, "phone" bigint, "country" character varying(50), "address" character varying(50), "city" character varying(50), "isAdmin" boolean NOT NULL DEFAULT false, "orderId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details_products" ("orderDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_8398c58942a441d063220ba7722" PRIMARY KEY ("orderDetailsId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_004ffc7044adfc72fc058a0e32" ON "order_details_products" ("orderDetailsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4592a14f5578c3385b67e94e8f" ON "order_details_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_c3932231d2385ac248d0888d955" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_bb1ea956e38abca70b9a0d2c649" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_5f61fc1096fcc5d9c0f439dfd2c" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_004ffc7044adfc72fc058a0e329" FOREIGN KEY ("orderDetailsId") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_4592a14f5578c3385b67e94e8ff" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_4592a14f5578c3385b67e94e8ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_004ffc7044adfc72fc058a0e329"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_5f61fc1096fcc5d9c0f439dfd2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_bb1ea956e38abca70b9a0d2c649"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_c3932231d2385ac248d0888d955"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4592a14f5578c3385b67e94e8f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_004ffc7044adfc72fc058a0e32"`,
    );
    await queryRunner.query(`DROP TABLE "order_details_products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "orderDetails"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
