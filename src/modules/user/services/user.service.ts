import { EnumSortDirection, EnumUserRole } from '@common/enums';
import { PageMetaDto, PageOptionsDto } from '@common/paginations';
import {
  ExceptionHandler,
  NotFoundException,
  NotImplementedException,
} from '@core/exceptions';
import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Raw, Repository } from 'typeorm';
import { UpdateUserEmailRequestDto, UserFilterDto } from '../dtos/requests';
import {
  PageUserResponseDto,
  UserResponseDto,
} from '../dtos/responses/user.response.dto';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateEmail(input: UpdateUserEmailRequestDto): Promise<void> {
    throw new NotImplementedException('Method not implemented.');
  }

  async getOne(userId: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['userInfo'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return plainToInstance(UserResponseDto, user);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getMany(
    pageOptionsDto: PageOptionsDto,
    filters: UserFilterDto,
  ): Promise<PageUserResponseDto> {
    try {
      const { page, take, skip, sort, sortDirection } = pageOptionsDto;

      const { keywords } = filters;

      const searchQuery = keywords?.trim().toLowerCase();
      const searchVector = searchQuery
        ? `${searchQuery.split(/\s+/).join(':* & ')}:*`
        : null;

      const [users, total] = await this.userRepository.findAndCount({
        where: {
          role: EnumUserRole.USER,
          searchVector: searchVector
            ? Raw((alias) => `${alias} @@ to_tsquery('simple',:query)`, {
                query: searchVector,
              })
            : null,
        },
        relations: ['userInfo'],
        order: {
          [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
        },
        skip,
        take,
      });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      return new PageUserResponseDto(
        plainToInstance(UserResponseDto, users),
        meta,
      );
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
