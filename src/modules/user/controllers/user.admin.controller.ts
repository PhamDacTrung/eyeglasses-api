import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { PageOptionsDto } from '@common/paginations';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { UserFilterDto } from '../dtos/requests';
import { PageUserResponseDto, UserResponseDto } from '../dtos/responses';
import { IUserService } from '../interfaces';

@Controller({
  path: 'users',
  version: '1',
})
export class UserAdminController {
  constructor(
    @Inject(EnumInjectServiceToken.USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Roles(EnumUserRole.ADMIN)
  @Get()
  @ApiResponseWrapper(PageUserResponseDto, 'Get all users')
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filters: UserFilterDto,
  ): Promise<PageUserResponseDto> {
    return this.userService.getMany(pageOptionsDto, filters);
  }

  @Roles(EnumUserRole.ADMIN)
  @Get(':id')
  @ApiResponseWrapper(UserResponseDto, 'Get user by id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getOne(id);
  }
}
