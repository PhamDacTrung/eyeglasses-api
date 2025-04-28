import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariables {
  @IsDefined()
  @IsString()
  @MinLength(1)
  PROJECT_NAME: string;

  @IsDefined()
  @IsEnum(Environment)
  @MinLength(1)
  NODE_ENV: Environment;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_HOST: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  POSTGRES_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_USER: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_DB: string;

  @IsDefined()
  @IsBoolean()
  DB_LOGGING: boolean;

  @IsDefined()
  @IsString()
  @MinLength(8)
  ACCESS_TOKEN_SECRET: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  ACCESS_TOKEN_EXPIRES_IN: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  JWT_RESET_PASSWORD_KEY: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    console.error('\nMissing or invalid environment variables:');
    errors.forEach((error, index) => {
      Object.values(error.constraints ?? {}).forEach((message) => {
        console.error(`${index + 1}: ${message}`);
      });
    });
    console.error('\n ***** \n');
    throw new Error(
      'Please provide the valid ENVs mentioned above and restart the server',
    );
  }

  return finalConfig;
}
