import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCartItemRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The ID of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The quantity of the product',
    example: 1,
  })
  quantity: number;
}

export class UpdateCartItemRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The quantity of the product',
    example: 1,
  })
  quantity: number;
}
