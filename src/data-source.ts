import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [__dirname + '/migrations/*.ts'],
  entities: [__dirname + '/entities/*.ts'],
  logging: true,
  extra: {
    connectionLimit: process.env.DATABASE_LIMIT_CONNECTION,
  },
});

dataSource.initialize();
