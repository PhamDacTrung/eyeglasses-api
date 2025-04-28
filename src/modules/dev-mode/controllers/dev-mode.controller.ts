import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiResponseWrapper, IsPublic } from '@common/decorators';

import { AuthTokenDto } from '@modules/auth/dtos';
import { EmailRequestDto } from '../dtos';
import { DevModeService } from '../services/dev-mode.service';

@ApiTags('dev-mode')
@Controller({
  path: 'dev-mode',
})
@IsPublic()
export class DevModeController {
  constructor(private readonly devModeService: DevModeService) {}

  @Post('generate-token')
  @ApiResponseWrapper(AuthTokenDto, 'Get development user token')
  async getUserToken(@Body() body: EmailRequestDto): Promise<AuthTokenDto> {
    return await this.devModeService.generateToken(body);
  }
}
