import { createPageDto } from '@common/paginations';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserAddressResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the user address',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St',
  })
  address: string;

  @Expose()
  @ApiProperty({
    description: 'The city of the user',
    example: 'New York',
  })
  city: string;

  @Expose()
  @ApiProperty({
    description: 'The state of the user',
    example: 'NY',
  })
  state: string;

  @Expose()
  @ApiProperty({
    description: 'The country of the user',
    example: 'United States',
  })
  country: string;

  @Expose()
  @ApiProperty({
    description: 'Whether the address is the default address',
    example: false,
  })
  isDefault: boolean;
}

export class PageUserAddressResponseDto extends createPageDto(
  UserAddressResponseDto,
) {}
