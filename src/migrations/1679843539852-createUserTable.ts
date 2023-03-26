import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createUserTable1679843539852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar(255)',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'username',
                        type: 'varchar(255)',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar(255)',
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
