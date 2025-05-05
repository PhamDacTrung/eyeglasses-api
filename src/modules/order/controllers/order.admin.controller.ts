import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateOrderRequestDto } from '../dtos/requests';
import { IOrderService } from '../interfaces';

@Controller({
  path: 'orders',
  version: '1',
})
@ApiTags('Orders (Admin only)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.ADMIN)
export class OrderAdminController {
  constructor(
    @Inject(EnumInjectServiceToken.ORDER_SERVICE)
    private readonly orderService: IOrderService,
  ) {}

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(EnumUserRole.ADMIN)
  @ApiResponseWrapper(undefined, 'Update order status')
  updateStatus(
    @Param('id') id: string,
    @Body() data: UpdateOrderRequestDto,
  ): Promise<void> {
    return this.orderService.updateStatus(id, data.status);
  }
}
