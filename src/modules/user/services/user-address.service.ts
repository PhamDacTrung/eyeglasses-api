import { EnumSortDirection } from '@common/enums';
import { PageMetaDto, PageOptionsDto } from '@common/paginations';
import {
  ExceptionHandler,
  NotFoundException,
  UnprocessableEntityException,
} from '@core/exceptions';
import { UserAddress } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  CreateUserAddressRequestDto,
  UpdateUserAddressRequestDto,
} from '../dtos/requests';
import {
  PageUserAddressResponseDto,
  UserAddressResponseDto,
} from '../dtos/responses';
import { IUserAddressService } from '../interfaces';

@Injectable()
export class UserAddressService implements IUserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
  ) {}

  @Transactional()
  async create(
    userId: string,
    data: CreateUserAddressRequestDto,
  ): Promise<UserAddressResponseDto> {
    try {
      const { isDefault } = data;

      if (isDefault) {
        // check if there is already a default address
        const defaultAddress = await this.userAddressRepository.findOne({
          where: { userId, isDefault: true },
        });

        if (defaultAddress) {
          await this.userAddressRepository.update(defaultAddress.id, {
            isDefault: false,
          });
        }
      }

      const userAddress = await this.userAddressRepository.save(
        this.userAddressRepository.create({ ...data, userId }),
      );
      return plainToInstance(UserAddressResponseDto, userAddress);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  @Transactional()
  async update(
    userId: string,
    id: string,
    data: UpdateUserAddressRequestDto,
  ): Promise<UserAddressResponseDto> {
    try {
      const { isDefault } = data;

      if (isDefault) {
        // check if there is already a default address
        const defaultAddress = await this.userAddressRepository.findOne({
          where: { userId, isDefault: true },
        });

        if (defaultAddress) {
          await this.userAddressRepository.update(defaultAddress.id, {
            isDefault: false,
          });
        }
      }
      const userAddress = await this.userAddressRepository.update(id, data);

      if (userAddress.affected === 0) {
        throw new UnprocessableEntityException('Failed to update user address');
      }

      return plainToInstance(UserAddressResponseDto, userAddress);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  @Transactional()
  async getOne(id: string): Promise<UserAddressResponseDto> {
    try {
      const userAddress = await this.userAddressRepository.findOne({
        where: { id },
      });

      if (!userAddress) {
        throw new NotFoundException('User address not found');
      }

      return plainToInstance(UserAddressResponseDto, userAddress);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getMany(
    userId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageUserAddressResponseDto> {
    try {
      const { page, take, skip, sort, sortDirection } = pageOptionsDto;

      const [userAddresses, total] =
        await this.userAddressRepository.findAndCount({
          where: { userId },
          skip,
          take,
          order: {
            [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
          },
        });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      return new PageUserAddressResponseDto(
        plainToInstance(UserAddressResponseDto, userAddresses),
        meta,
      );
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  @Transactional()
  async delete(userId: string, id: string): Promise<void> {
    try {
      const existingUserAddress = await this.userAddressRepository.findOne({
        where: { id, userId },
      });

      if (!existingUserAddress) {
        throw new NotFoundException('User address not found');
      }

      if (existingUserAddress.isDefault) {
        // get random user address
        const randomUserAddress = await this.userAddressRepository.findOne({
          where: { isDefault: false },
        });

        if (randomUserAddress) {
          await this.userAddressRepository.update(randomUserAddress.id, {
            isDefault: true,
          });
        }
      }

      const result = await this.userAddressRepository.delete(id);

      if (result.affected === 0) {
        throw new UnprocessableEntityException('Failed to delete user address');
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
