import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PageMetaDto {
  constructor({
    page,
    take,
    itemCount,
    recommendBegin,
  }: {
    page: number;
    take: number;
    itemCount: number;
    recommendBegin?: number | undefined;
  }) {
    this.page = page;
    this.take = take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;

    if (recommendBegin !== undefined) {
      this.recommendBegin = recommendBegin;
    } else {
      this.recommendBegin = null;
    }
  }

  @Expose()
  @IsNumber()
  @ApiProperty({
    description: 'The current page number',
    example: 1,
  })
  page: number;

  @Expose()
  @IsNumber()
  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  take: number;

  @Expose()
  @IsNumber()
  @ApiProperty({
    description: 'The total number of items',
    example: 100,
  })
  itemCount: number;

  @Expose()
  @IsNumber()
  @ApiProperty({
    description: 'The total number of pages',
    example: 10,
  })
  pageCount: number;

  @Expose()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the current page has a previous page',
    example: true,
  })
  hasPreviousPage: boolean;

  @Expose()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the current page has a next page',
    example: true,
  })
  hasNextPage: boolean;

  @Expose()
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The beginning of the recommended range',
    example: 1,
  })
  recommendBegin: number | null;
}
