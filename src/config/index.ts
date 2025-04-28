import AuthConfig from './auth/auth.config';
import DatabaseConfig from './database/db.config';
import LogConfig from './logger/log.config';

export const configurations = [DatabaseConfig, LogConfig, AuthConfig];

export { AuthConfig, DatabaseConfig, LogConfig };
