import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateOrDeleteResponseDto {
  @Expose()
  @ApiProperty({ example: true, type: Boolean })
  isSuccess: boolean;

  @Expose()
  @ApiProperty({ example: '2024-01-01 00:00:00', type: Date })
  at?: Date = new Date();
}
