import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrderCouponResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the order coupon',
    example: '1',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The created at of the order coupon',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The id of the order',
    example: '1',
  })
  orderId: string;

  @Expose()
  @ApiProperty({
    description: 'The id of the coupon',
    example: '1',
  })
  couponId: string;
}
