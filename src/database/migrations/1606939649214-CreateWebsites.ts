import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateWebsites1606939649214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'websites',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'plan',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'segment_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'website_address',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'thumbnail',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'amount_paid',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'salesman',
            type: 'varchar',
            length: '80',
            isNullable: true,
          },
          {
            name: 'publish_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'websites',
      new TableForeignKey({
        name: 'WebsiteSegment',
        columnNames: ['segment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'segments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('websites', 'WebsiteSegment');
    await queryRunner.dropColumn('websites', 'segment_id');
    await queryRunner.dropTable('websites');
  }
}
