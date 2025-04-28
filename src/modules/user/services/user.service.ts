import { PageOptionsDto } from '@common/paginations';
import {
  ExceptionHandler,
  NotFoundException,
  NotImplementedException,
} from '@core/exceptions';
import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
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

  getMany(
    pageOptionsDto: PageOptionsDto,
    filters: UserFilterDto,
  ): Promise<PageUserResponseDto> {
    throw new NotImplementedException('Method not implemented.');
  }
}
