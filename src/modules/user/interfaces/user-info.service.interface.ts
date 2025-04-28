import { UpsertUserInfoRequestDto } from '../dtos/requests';
import { UserInfoResponseDto } from '../dtos/responses';

export interface IUserInfoService {
  upsert(input: UpsertUserInfoRequestDto): Promise<void>;

  getOne(userId: string): Promise<UserInfoResponseDto>;
}
