import { ObjectFilterDto } from '@common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserEmailRequestDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email: string;
}

export class UserFilterDto extends ObjectFilterDto {}
