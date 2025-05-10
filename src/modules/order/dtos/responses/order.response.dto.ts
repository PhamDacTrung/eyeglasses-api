import { EnumOrderStatus, EnumPaymentMethod } from '@common/enums';
import { createPageDto } from '@common/paginations';
import { UserResponseDto } from '@modules/user/dtos/responses';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderItemResponseDto } from './order-item.response.dto';

export class OrderResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({
    description: 'The user of the order',
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @Expose()
  @Type(() => OrderItemResponseDto)
  @ApiProperty({
    description: 'The items of the order',
    type: [OrderItemResponseDto],
  })
  items: OrderItemResponseDto[];

  @Expose()
  @ApiProperty({
    description: 'The final shipping fee of the order',
    example: 100,
  })
  finalShippingFee: number;

  @Expose()
  @ApiProperty({
    description: 'The total amount of the order',
    example: 100,
  })
  originalAmount: number;

  @Expose()
  @ApiProperty({
    description: 'The final amount of the order',
    example: 100,
  })
  finalAmount: number;

  @Expose()
  @ApiProperty({
    description: 'The shipping address of the order',
    example: '123 Main St, Anytown, USA',
  })
  shippingAddress: string;

  @Expose()
  @ApiProperty({
    description: 'The shipping fee of the order',
    example: 100,
  })
  originalShippingFee: number;

  @Expose()
  @ApiProperty({
    description: 'The status of the order',
    example: EnumOrderStatus.PENDING,
    enum: EnumOrderStatus,
  })
  status: EnumOrderStatus;

  @Expose()
  @ApiProperty({
    description: 'The payment method of the order',
    example: EnumPaymentMethod.CREDIT_CARD,
    enum: EnumPaymentMethod,
  })
  paymentMethod: EnumPaymentMethod;
}

export class PageOrderResponseDto extends createPageDto(OrderResponseDto) {}
