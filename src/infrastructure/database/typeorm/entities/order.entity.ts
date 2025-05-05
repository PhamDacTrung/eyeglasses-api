import { EnumOrderStatus, EnumPaymentMethod } from '@common/enums';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderItem } from './order-item.entity';
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

  @Column({ nullable: true })
  shippingAddress?: string | null;

  @Column({ nullable: true })
  trackingNumber?: string | null;

  @Column({
    type: 'enum',
    enum: EnumPaymentMethod,
    nullable: true,
    default: EnumPaymentMethod.CASH_ON_DELIVERY,
  })
  paymentMethod?: EnumPaymentMethod | null;
}
