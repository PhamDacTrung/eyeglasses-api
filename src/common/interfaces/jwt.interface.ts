import { Request } from 'express';
import { AuthPayload } from './auth-payload.interface';

export interface IAccessToken {
  accessToken: string;
}

export interface RequestWithAuth extends Request {
  user: AuthPayload;
}
