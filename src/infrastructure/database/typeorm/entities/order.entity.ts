import { EnumOrderStatus, EnumPaymentMethod } from '@common/enums';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Coupon } from './coupon.entity';
import { OrderItem } from './order-item.entity';
import { UserAddress } from './user-address.entity';
import { User } from './user.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: EnumOrderStatus,
    default: EnumOrderStatus.PENDING,
  })
  status: EnumOrderStatus;

  @Column({ type: 'uuid', nullable: true })
  userAddressId?: string | null;

  @ManyToOne(() => UserAddress, { nullable: true })
  @JoinColumn({ name: 'user_address_id' })
  userAddress?: UserAddress | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  shippingFee?: number | null;

  @Column({ type: 'time with time zone', nullable: true })
  deliveryAt?: Date | null;

  @Column({ type: 'time with time zone', nullable: true })
  completedAt?: Date | null;

  @Column({ type: 'time with time zone', nullable: true })
  cancelledAt?: Date | null;

  @Column({
    type: 'enum',
    enum: EnumPaymentMethod,
    nullable: true,
    default: EnumPaymentMethod.CASH_ON_DELIVERY,
  })
  paymentMethod?: EnumPaymentMethod | null;

  @Column({ type: 'uuid', nullable: true })
  couponId?: string | null;

  @ManyToOne(() => Coupon, { nullable: true })
  @JoinColumn({ name: 'coupon_id' })
  coupon?: Coupon | null;
}
