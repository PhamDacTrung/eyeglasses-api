import { ProductResponseDto } from '@modules/product/dtos/responses';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class OrderItemResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the order item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @Type(() => ProductResponseDto)
  @ApiProperty({
    description: 'The product of the order item',
    type: ProductResponseDto,
  })
  product: ProductResponseDto;

  @Expose()
  @ApiProperty({
    description: 'The quantity of the order item',
    example: 1,
  })
  quantity: number;

  @Expose()
  @ApiProperty({
    description: 'The price of the order item',
    example: 100,
  })
  price: number;
}
