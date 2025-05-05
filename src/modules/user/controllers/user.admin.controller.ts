import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageOptionsDto } from '@common/paginations';
import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserFilterDto } from '../dtos/requests';
import { PageUserResponseDto, UserResponseDto } from '../dtos/responses';
import { IUserService } from '../interfaces';

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('Users (Admin only)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.ADMIN)
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
