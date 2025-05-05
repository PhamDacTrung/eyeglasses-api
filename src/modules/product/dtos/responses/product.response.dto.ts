import { createPageDto } from '@common/paginations';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product 1',
  })
  name: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'The code of the product',
    example: '1234567890',
    nullable: true,
  })
  code?: string | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'The description of the product',
    example: 'This is a description of the product',
    nullable: true,
  })
  description?: string | null;

  @Expose()
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  price: number;

  @Expose()
  @ApiProperty({
    description: 'The quantity of the product',
    example: 100,
  })
  stockQuantity: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'The image of the product',
    example: [
      'https://example.com/image.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  imageUrls?: string[] | null;

  @Expose()
  @ApiProperty({
    description: 'The public status of the product',
    example: true,
  })
  isPublic: boolean;
}

export class PageProductResponseDto extends createPageDto(ProductResponseDto) {}
