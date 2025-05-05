import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageOptionsDto } from '@common/paginations';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderRequestDto, OrderFilterDto } from '../dtos/requests';
import { OrderResponseDto, PageOrderResponseDto } from '../dtos/responses';
import { OrderService } from '../services/order.service';

@Controller({
  path: 'orders',
  version: '1',
})
@ApiTags('Orders')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.USER)
export class OrderController {
  constructor(
    @Inject(EnumInjectServiceToken.ORDER_SERVICE)
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @ApiResponseWrapper(OrderResponseDto, 'Create order')
  createOrder(
    @CurrentUser('id') userId: string,
    @Body() data: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(userId, data);
  }

  @Get()
  @ApiResponseWrapper(PageOrderResponseDto, 'Get all orders')
  findAll(
    @CurrentUser('id') userId: string,
    @Query() pageOptionDtos: PageOptionsDto,
    @Query() filters: OrderFilterDto,
  ): Promise<PageOrderResponseDto> {
    return this.orderService.findAll(userId, pageOptionDtos, filters);
  }

  @Get(':id')
  @ApiResponseWrapper(OrderResponseDto, 'Get order by id')
  findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.orderService.findOne(id);
  }
}
