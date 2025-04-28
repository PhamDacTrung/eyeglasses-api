import { NamingStrategy } from '@infrastructure/database/typeorm/config';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DB_LOGGING,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from 'environments';
import { join } from 'path';
import { CONFIG_KEY } from '../config-key';

export default registerAs<TypeOrmModuleOptions>(CONFIG_KEY.DATABASE, () => ({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: DB_LOGGING,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
}));
