import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class DatabaseUtilService {
  async executeTransaction(
    datasource: DataSource,
    callback: (queryRunner: QueryRunner) => any,
  ) {
    let result: any = null;
    const queryRunner: QueryRunner = datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      result = await callback(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }
}
