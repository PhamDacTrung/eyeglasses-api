import {
  EnumCouponApplicableTo,
  EnumCouponStatus,
  EnumCouponType,
} from '@common/enums';
import { createPageDto } from '@common/paginations';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CouponResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the coupon',
    example: '1',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The created at of the coupon',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The updated at of the coupon',
    example: '2023-01-01T00:00:00Z',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The code of the coupon',
    example: 'SUMMER10',
  })
  code: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'The name of the coupon',
    example: 'Summer Sale',
  })
  name?: string | null;

  @Expose()
  @ApiProperty({
    description: 'The type of the coupon',
    example: EnumCouponType.PERCENTAGE,
    enum: EnumCouponType,
  })
  type: EnumCouponType;

  @Expose()
  @ApiProperty({
    description: 'The value of the coupon',
    example: 10,
  })
  value: number;

  @Expose()
  @ApiProperty({
    description: 'The start date of the coupon',
    example: '2023-01-01T00:00:00Z',
  })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The end date of the coupon',
    example: '2023-12-31T23:59:59Z',
  })
  endDate: Date;

  @Expose()
  @ApiPropertyOptional({
    description: 'The minimum spend required to use the coupon',
    example: 50,
  })
  minSpend?: number | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'The maximum spend allowed to use the coupon',
    example: 500,
  })
  maxSpend?: number | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'The maximum number of times the coupon can be used',
    example: 100,
  })
  usageLimit?: number | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'The number of times the coupon has been used',
    example: 10,
  })
  usageCount?: number | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'The status of the coupon',
    example: EnumCouponStatus.ACTIVE,
    enum: EnumCouponStatus,
    default: EnumCouponStatus.ACTIVE,
  })
  status?: EnumCouponStatus | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'What the coupon is applicable to',
    example: EnumCouponApplicableTo.PRODUCT,
    enum: EnumCouponApplicableTo,
    default: EnumCouponApplicableTo.PRODUCT,
  })
  applicableTo?: EnumCouponApplicableTo | null;

  @Expose()
  @ApiPropertyOptional({
    description: 'Whether the coupon is public',
    example: true,
  })
  isPublic?: boolean;
}

export class PageCouponResponseDto extends createPageDto(CouponResponseDto) {}
