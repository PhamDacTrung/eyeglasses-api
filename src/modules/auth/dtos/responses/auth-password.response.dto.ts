import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterResponseDto {
  @Expose()
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: string;

  @Expose()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'user01@gmail.com' })
  email: string;
}
