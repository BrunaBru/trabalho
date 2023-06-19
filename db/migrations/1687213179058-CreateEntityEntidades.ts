import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntityEntidades1687213179058 implements MigrationInterface {
    name = 'CreateEntityEntidades1687213179058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."despesas_categoria_enum" AS ENUM('OUTRAS', 'SAUDE', 'ALIMENTACAO', 'LAZER', 'TRANSPORTE', ' ESTUDOS', 'BELEZA', 'MORADIA')`);
        await queryRunner.query(`CREATE TABLE "despesas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "categoria" "public"."despesas_categoria_enum" DEFAULT 'OUTRAS', "data" date, "valor" double precision, CONSTRAINT "PK_e56af303d820f51a6e6a007b380" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_genero_enum" AS ENUM('Feminino', 'Masculino', 'Outros', 'Prefiro não informar')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "apelido" character varying NOT NULL, "email" character varying NOT NULL, "nascimento" date, "genero" "public"."usuarios_genero_enum" DEFAULT 'Prefiro não informar', "tarefa_id" uuid, "despesa_id" uuid, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tarefas_prioridade_enum" AS ENUM('Normal', 'Importante', 'Urgente')`);
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "prioridade" "public"."tarefas_prioridade_enum" DEFAULT 'Normal', "dataInicial" date, "dataFinal" date, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "tarefa_fk" FOREIGN KEY ("tarefa_id") REFERENCES "tarefas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "despesa_fk" FOREIGN KEY ("despesa_id") REFERENCES "despesas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "despesa_fk"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "tarefa_fk"`);
        await queryRunner.query(`DROP TABLE "tarefas"`);
        await queryRunner.query(`DROP TYPE "public"."tarefas_prioridade_enum"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_genero_enum"`);
        await queryRunner.query(`DROP TABLE "despesas"`);
        await queryRunner.query(`DROP TYPE "public"."despesas_categoria_enum"`);
    }

}
