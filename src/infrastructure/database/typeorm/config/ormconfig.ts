import { join } from 'path';

import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from 'environments';
import { DataSource, DataSourceOptions } from 'typeorm';

import { NamingStrategy } from './naming.strategy';

const options: DataSourceOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [join(__dirname, '../entities/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
  migrationsTableName: '__migrations',
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
};

export const connectionSource = new DataSource(options);
