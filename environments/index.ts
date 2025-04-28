import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const PROJECT_NAME: string = process.env.PROJECT_NAME || 'backend';

// * HTTP
export const HTTP_ENABLE: boolean = process.env.HTTP_ENABLE === 'true' || false;

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

// * POSTGRES
export const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT: number = process.env.POSTGRES_PORT
  ? parseInt(process.env.POSTGRES_PORT, 10)
  : 5436;
export const POSTGRES_USER: string = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD: string =
  process.env.POSTGRES_PASSWORD || 'postgres';
export const POSTGRES_DB: string = process.env.POSTGRES_DB || 'postgres';
export const DB_LOGGING: boolean = process.env.DB_LOGGING === 'true' || false;

// * AUTH
export const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'xw5DjZgX3TkTT';
export const ACCESS_TOKEN_EXPIRES_IN: string =
  process.env.ACCESS_TOKEN_EXPIRES_IN || '604800'; // 7 days
export const JWT_RESET_PASSWORD_KEY: string =
  process.env.JWT_RESET_PASSWORD_KEY || 's21DjZg12Jde';
