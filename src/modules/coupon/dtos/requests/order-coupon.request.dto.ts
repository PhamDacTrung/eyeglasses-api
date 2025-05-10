import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderCouponRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the order',
    example: '1',
  })
  orderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the coupon',
    example: '1',
  })
  couponId: string;
}

export class CreateManyOrderCouponRequestDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The list of order coupons',
    type: [CreateOrderCouponRequestDto],
  })
  orderCoupons: CreateOrderCouponRequestDto[];
}
