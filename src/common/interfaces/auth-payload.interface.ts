import { EnumUserRole } from '@common/enums';

export interface AuthPayload {
  id: string;
  name: string;
  email: string;
  role: EnumUserRole;
}
