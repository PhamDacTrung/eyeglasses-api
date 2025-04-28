import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }

  @Expose()
  @ApiProperty({ type: [Object] })
  @IsArray()
  data: T[];

  @Expose()
  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}

export function createPageDto<T>(itemType: new () => T) {
  class PageResponseDto extends PageDto<T> {
    @ApiProperty({ type: () => [itemType] }) // Dynamically infer the type
    data: T[];
  }
  return PageResponseDto;
}
