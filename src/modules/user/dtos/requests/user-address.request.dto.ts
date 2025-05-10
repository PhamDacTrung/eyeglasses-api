import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAddressRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The city of the user',
    example: 'New York',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The state of the user',
    example: 'NY',
  })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The country of the user',
    example: 'United States',
  })
  country: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the address is the default address',
    example: false,
  })
  isDefault: boolean;
}

export class UpdateUserAddressRequestDto extends PartialType(
  CreateUserAddressRequestDto,
) {}
