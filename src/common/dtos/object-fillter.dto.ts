import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ObjectFilterDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The name of the object' })
  keywords?: string;
}
