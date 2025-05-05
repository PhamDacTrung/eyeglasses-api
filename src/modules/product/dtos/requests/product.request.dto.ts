import { ObjectFilterDto } from '@common/dtos';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product 1',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The code of the product',
    example: 'P123',
    required: false,
    nullable: true,
  })
  code?: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a description of the product',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 100,
  })
  stockQuantity: number;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The image URLs of the product',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  imageUrls?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The public status of the product',
    example: true,
    required: false,
    nullable: true,
  })
  isPublic: boolean;
}

export class UpdateProductRequestDto extends PartialType(
  CreateProductRequestDto,
) {}

export class ProductFiltersDto extends ObjectFilterDto {}
