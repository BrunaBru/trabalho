import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntityEntidades1687221631257 implements MigrationInterface {
    name = 'CreateEntityEntidades1687221631257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."despesas_categoria_enum" AS ENUM('OUTRAS', 'SAUDE', 'ALIMENTACAO', 'LAZER', 'TRANSPORTE', ' ESTUDOS', 'BELEZA', 'MORADIA')`);
        await queryRunner.query(`CREATE TABLE "despesas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "categoria" "public"."despesas_categoria_enum" DEFAULT 'OUTRAS', "data" date, "valor" double precision, "usuarioId" uuid, CONSTRAINT "PK_e56af303d820f51a6e6a007b380" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_genero_enum" AS ENUM('Feminino', 'Masculino', 'Outros', 'Prefiro não informar')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "apelido" character varying NOT NULL, "email" character varying NOT NULL, "nascimento" date, "genero" "public"."usuarios_genero_enum" DEFAULT 'Prefiro não informar', CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tarefas_prioridade_enum" AS ENUM('Normal', 'Importante', 'Urgente')`);
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "prioridade" "public"."tarefas_prioridade_enum" DEFAULT 'Normal', "dataInicial" date, "dataFinal" date, "usuarioId" uuid, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "despesas" ADD CONSTRAINT "FK_f8bd448cc12c6d93b17ed1677be" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tarefas" ADD CONSTRAINT "FK_74c239e8fc0ed43f926c17cdd71" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" DROP CONSTRAINT "FK_74c239e8fc0ed43f926c17cdd71"`);
        await queryRunner.query(`ALTER TABLE "despesas" DROP CONSTRAINT "FK_f8bd448cc12c6d93b17ed1677be"`);
        await queryRunner.query(`DROP TABLE "tarefas"`);
        await queryRunner.query(`DROP TYPE "public"."tarefas_prioridade_enum"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_genero_enum"`);
        await queryRunner.query(`DROP TABLE "despesas"`);
        await queryRunner.query(`DROP TYPE "public"."despesas_categoria_enum"`);
    }

}
