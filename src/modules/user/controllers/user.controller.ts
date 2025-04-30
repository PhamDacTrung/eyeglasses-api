import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dtos/responses';
import { IUserService } from '../interfaces';

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
  ) {}

  @Get('@me')
  @ApiResponseWrapper(UserResponseDto, 'Get current user')
  async getCurrentUser(
    @CurrentUser('id') userId: string,
  ): Promise<UserResponseDto> {
    return this.userService.getOne(userId);
  }
}
