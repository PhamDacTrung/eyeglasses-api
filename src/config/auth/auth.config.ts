import { registerAs } from '@nestjs/config';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  JWT_RESET_PASSWORD_KEY,
} from 'environments';
import { CONFIG_KEY } from '../config-key';

export default registerAs(CONFIG_KEY.AUTH, () => ({
  jwtSecret: ACCESS_TOKEN_SECRET || 'xw5DjZgX3TkTT',
  accessTokenExpiration: ACCESS_TOKEN_EXPIRES_IN || '604800', // 7 days
  resetPasswordKey: JWT_RESET_PASSWORD_KEY || 's21DjZg12Jde',
}));
