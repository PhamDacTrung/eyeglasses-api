import { SetMetadata } from '@nestjs/common';
import { EnumUserRole } from '../enums';

export const ROLES_KEY = 'role';
export const Roles = (...roles: EnumUserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
