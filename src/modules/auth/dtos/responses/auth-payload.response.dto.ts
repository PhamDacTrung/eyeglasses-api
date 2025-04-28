import { EnumUserRole } from '@common/enums';
import { AuthPayload } from '@common/interfaces';
import { Expose } from 'class-transformer';

export class AuthPayloadDto implements AuthPayload {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: EnumUserRole;
}
