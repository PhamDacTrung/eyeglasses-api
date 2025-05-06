import { EnumCouponStatus, EnumCouponType } from '@common/enums';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Coupon extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  code: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string | null;

  @Column({
    type: 'enum',
    enum: EnumCouponType,
  })
  type: EnumCouponType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'time with time zone' })
  startDate: Date;

  @Column({ type: 'time with time zone' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minSpend?: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxSpend?: number | null;

  @Column({ type: 'int', nullable: true })
  usageLimit?: number | null;

  @Column({ type: 'int', nullable: true })
  usageCount?: number | null;

  @Column({
    type: 'enum',
    enum: EnumCouponStatus,
    default: EnumCouponStatus.ACTIVE,
  })
  status: EnumCouponStatus;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', code || ' ' || COALESCE(name, ''))",
    select: false,
    nullable: true,
  })
  @Index('coupon_search_vector_idx', { synchronize: false })
  searchVector: string;
}
