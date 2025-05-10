import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageOptionsDto } from '@common/paginations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateUserAddressRequestDto,
  UpdateUserAddressRequestDto,
} from '../dtos/requests';
import {
  PageUserAddressResponseDto,
  UserAddressResponseDto,
  UserResponseDto,
} from '../dtos/responses';
import { IUserAddressService, IUserService } from '../interfaces';

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.USER)
export class UserController {
  constructor(
    @Inject(EnumInjectServiceToken.USER_SERVICE)
    private readonly userService: IUserService,

    @Inject(EnumInjectServiceToken.USER_ADDRESS_SERVICE)
    private readonly userAddressService: IUserAddressService,
  ) {}

  @Get('@me')
  @ApiResponseWrapper(UserResponseDto, 'Get current user')
  async getCurrentUser(
    @CurrentUser('id') userId: string,
  ): Promise<UserResponseDto> {
    return this.userService.getOne(userId);
  }

  @Get('@me/addresses')
  @ApiResponseWrapper(PageUserAddressResponseDto, 'Get current user addresses')
  async getCurrentUserAddresses(
    @CurrentUser('id') userId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageUserAddressResponseDto> {
    return this.userAddressService.getMany(userId, pageOptionsDto);
  }

  @Post('@me/addresses')
  @ApiResponseWrapper(UserAddressResponseDto, 'Create user address')
  async createUserAddress(
    @CurrentUser('id') userId: string,
    @Body() createUserAddressDto: CreateUserAddressRequestDto,
  ): Promise<UserAddressResponseDto> {
    return this.userAddressService.create(userId, createUserAddressDto);
  }

  @Put('@me/addresses/:id')
  @ApiResponseWrapper(UserAddressResponseDto, 'Update user address')
  async updateUserAddress(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressRequestDto,
  ): Promise<UserAddressResponseDto> {
    return this.userAddressService.update(userId, id, updateUserAddressDto);
  }

  @Delete('@me/addresses/:id')
  @ApiResponseWrapper(UserAddressResponseDto, 'Delete user address')
  async deleteUserAddress(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.userAddressService.delete(userId, id);
  }
}
