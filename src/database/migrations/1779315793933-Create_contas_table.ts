import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateContasTable1779315793933
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // cria tabela
    await queryRunner.createTable(
      new Table({
        name: "contas",
        columns: [
          {
            name: "conta_id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "nome",
            type: "varchar",
            length: "150",
          },
          {
            name: "saldo",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "current_timestamp",
          },
        ],
      })
    );

    // cria foreign key
    await queryRunner.createForeignKey(
      "contas",
      new TableForeignKey({
        name: "FK_contas_user",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("contas", "FK_contas_user");
    await queryRunner.dropTable("contas");
  }
}