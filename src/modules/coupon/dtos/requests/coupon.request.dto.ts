import { ObjectFilterDto } from '@common/dtos';
import {
  EnumCouponApplicableTo,
  EnumCouponStatus,
  EnumCouponType,
} from '@common/enums';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCouponRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The code of the coupon',
    example: 'SUMMER10',
  })
  code: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The name of the coupon',
    example: 'Summer Sale',
  })
  name?: string | null;

  @IsEnum(EnumCouponType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the coupon',
    example: EnumCouponType.PERCENTAGE,
    enum: EnumCouponType,
  })
  type: EnumCouponType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The value of the coupon',
    example: 10,
  })
  value: number;

  @IsDateString()
  @IsNotEmpty()
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

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'The minimum spend required to use the coupon',
    example: 50,
  })
  minSpend?: number | null;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'The maximum spend allowed to use the coupon',
    example: 500,
  })
  maxSpend?: number | null;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'The maximum number of times the coupon can be used',
    example: 100,
  })
  usageLimit?: number | null;

  @IsEnum(EnumCouponStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The status of the coupon',
    example: EnumCouponStatus.ACTIVE,
    enum: EnumCouponStatus,
    default: EnumCouponStatus.ACTIVE,
  })
  status?: EnumCouponStatus;

  @IsEnum(EnumCouponApplicableTo)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'What the coupon is applicable to',
    example: EnumCouponApplicableTo.PRODUCT,
    enum: EnumCouponApplicableTo,
    default: EnumCouponApplicableTo.PRODUCT,
  })
  applicableTo?: EnumCouponApplicableTo;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Whether the coupon is public',
    example: true,
  })
  isPublic?: boolean;
}

export class UpdateCouponRequestDto extends PartialType(
  CreateCouponRequestDto,
) {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'The number of times the coupon has been used',
    example: 10,
  })
  usageCount?: number | null;
}

export class CouponFilterDto extends ObjectFilterDto {
  @IsEnum(EnumCouponType)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The type of the coupon',
    example: EnumCouponType.PERCENTAGE,
    enum: EnumCouponType,
  })
  type?: EnumCouponType;

  @IsEnum(EnumCouponStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The status of the coupon',
    example: EnumCouponStatus.ACTIVE,
    enum: EnumCouponStatus,
  })
  status?: EnumCouponStatus;

  @IsEnum(EnumCouponApplicableTo)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'What the coupon is applicable to',
    example: EnumCouponApplicableTo.PRODUCT,
    enum: EnumCouponApplicableTo,
  })
  applicableTo?: EnumCouponApplicableTo;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Whether the coupon is public',
    example: true,
  })
  isPublic?: boolean;
}

export class PublicCouponFilterDto extends PickType(CouponFilterDto, [
  'keywords',
  'applicableTo',
]) {}
