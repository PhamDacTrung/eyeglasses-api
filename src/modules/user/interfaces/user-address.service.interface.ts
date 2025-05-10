import { PageOptionsDto } from '@common/paginations';
import {
  CreateUserAddressRequestDto,
  UpdateUserAddressRequestDto,
} from '../dtos/requests';
import {
  PageUserAddressResponseDto,
  UserAddressResponseDto,
} from '../dtos/responses';

export interface IUserAddressService {
  create(
    userId: string,
    data: CreateUserAddressRequestDto,
  ): Promise<UserAddressResponseDto>;

  update(
    userId: string,
    id: string,
    data: UpdateUserAddressRequestDto,
  ): Promise<UserAddressResponseDto>;

  getOne(id: string): Promise<UserAddressResponseDto>;

  getMany(
    userId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageUserAddressResponseDto>;

  delete(userId: string, id: string): Promise<void>;
}
