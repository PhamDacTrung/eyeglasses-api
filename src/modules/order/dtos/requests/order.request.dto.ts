import { ObjectFilterDto } from '@common/dtos';
import { EnumOrderStatus, EnumPaymentMethod } from '@common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The IDs of the cart items to be included in the order',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
    type: [String],
  })
  cartItemIds: string[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'The payment method of the order',
    example: EnumPaymentMethod.CREDIT_CARD,
    enum: EnumPaymentMethod,
  })
  paymentMethod: EnumPaymentMethod;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The shipping address of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userAddressId: string;

  @IsOptional({ each: true })
  @ApiPropertyOptional({
    description: 'The coupon ids of the order',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
    type: [String],
  })
  couponIds?: string[] | null;
}

export class OrderFilterDto extends ObjectFilterDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The status of the order',
    example: EnumOrderStatus.PENDING,
    enum: EnumOrderStatus,
    required: false,
  })
  status?: EnumOrderStatus;
}

export class UpdateOrderRequestDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus)
  @ApiPropertyOptional({
    description: 'The status of the order',
    example: EnumOrderStatus.PENDING,
    enum: EnumOrderStatus,
    required: false,
    nullable: true,
  })
  status?: EnumOrderStatus;
}
