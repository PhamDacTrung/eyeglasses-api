import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CartItemResponseDto } from './cart-item.response.dto';

export class CartResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @Type(() => CartItemResponseDto)
  @ApiProperty({
    description: 'The items in the cart',
    type: [CartItemResponseDto],
  })
  items: CartItemResponseDto[];

  @Expose()
  @ApiProperty({
    description: 'The total price of the cart',
    example: 100,
  })
  totalPrice: number;

  @Expose()
  @ApiProperty({
    description: 'The total quantity of the cart',
    example: 100,
  })
  totalQuantity: number;
}
