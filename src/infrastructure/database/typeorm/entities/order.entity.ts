import { EnumOrderStatus, EnumPaymentMethod } from '@common/enums';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderCoupon } from './order-coupon.entity';
import { OrderItem } from './order-item.entity';
import { UserAddress } from './user-address.entity';
import { User } from './user.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({
    type: 'enum',
    enum: EnumOrderStatus,
    default: EnumOrderStatus.PENDING,
  })
  status: EnumOrderStatus;

  @Column({ type: 'uuid', nullable: true })
  userAddressId?: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  originalAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  finalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalShippingFee?: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  finalShippingFee?: number | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deliveryAt?: Date | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  completedAt?: Date | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  cancelledAt?: Date | null;

  @Column({
    type: 'enum',
    enum: EnumPaymentMethod,
    nullable: true,
    default: EnumPaymentMethod.CASH_ON_DELIVERY,
  })
  paymentMethod?: EnumPaymentMethod | null;

  /**
   * related entities
   */

  @ManyToOne(() => UserAddress, { nullable: true })
  @JoinColumn({ name: 'user_address_id' })
  userAddress?: UserAddress | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToMany(() => OrderCoupon, (orderCoupon) => orderCoupon.order)
  orderCoupons: OrderCoupon[];
}
