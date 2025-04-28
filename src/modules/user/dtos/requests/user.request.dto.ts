import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserEmailRequestDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email: string;
}

export class UserFilterDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  keyword?: string;
}
