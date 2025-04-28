import { PageOptionsDto } from '@common/paginations';
import { UpdateUserEmailRequestDto, UserFilterDto } from '../dtos/requests';
import { PageUserResponseDto, UserResponseDto } from '../dtos/responses';

export interface IUserService {
  updateEmail(input: UpdateUserEmailRequestDto): Promise<void>;

  getOne(userId: string): Promise<UserResponseDto>;

  getMany(
    pageOptionsDto: PageOptionsDto,
    filters: UserFilterDto,
  ): Promise<PageUserResponseDto>;
}
