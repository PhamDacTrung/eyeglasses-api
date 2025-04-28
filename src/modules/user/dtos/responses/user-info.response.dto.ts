import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserInfoResponseDto {
  @Expose()
  @ApiPropertyOptional({
    description: 'Date of birth',
    example: '2021-01-01',
  })
  dateOfBirth: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Gender',
    example: 'Male',
  })
  gender: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Profession',
    example: 'Software Engineer',
  })
  profession: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Style',
    example: 'Casual',
  })
  style: string;
}
