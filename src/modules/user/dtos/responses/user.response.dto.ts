import { createPageDto } from '@common/paginations';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserInfoResponseDto } from './user-info.response.dto';

export class UserResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'The phone of the user',
    example: '1234567890',
    nullable: true,
  })
  phone?: string | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'The details of the user',
    type: UserInfoResponseDto,
  })
  details: UserInfoResponseDto;
}

export class PageUserResponseDto extends createPageDto(UserResponseDto) {}
