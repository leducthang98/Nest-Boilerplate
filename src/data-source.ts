import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [__dirname + '/migrations/*.ts'],
  logging: true,
  extra: {
    connectionLimit: process.env.DATABASE_LIMIT_CONNECTION,
  },
});

dataSource.initialize();

export default dataSource;
