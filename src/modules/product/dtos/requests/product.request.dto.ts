import { ObjectFilterDto } from '@common/dtos';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
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
  originalPrice: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The sale price of the product',
    example: 90,
    required: false,
    nullable: true,
  })
  salePrice?: number | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 100,
  })
  stockQuantity: number;

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
