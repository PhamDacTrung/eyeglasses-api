import { ProductResponseDto } from '@modules/product/dtos/responses';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CartItemResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the cart item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The ID of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @Expose()
  @Type(() => OmitType(ProductResponseDto, ['description', 'stockQuantity']))
  @ApiProperty({
    description: 'The product',
    type: OmitType(ProductResponseDto, ['description', 'stockQuantity']),
  })
  product: Omit<ProductResponseDto, 'description' | 'stockQuantity'>;

  @Expose()
  @ApiProperty({
    description: 'The quantity of the cart item',
    example: 1,
  })
  quantity: number;

  @Expose()
  @ApiProperty({
    description: 'The price of the cart item',
    example: 100,
  })
  price: number;
}
