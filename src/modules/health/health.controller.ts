import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IsPublic } from '@common/decorators';

@Controller()
export class HealthController {
  @ApiTags('Health')
  @IsPublic()
  @Get()
  getHealth() {
    return 'OK';
  }
}
