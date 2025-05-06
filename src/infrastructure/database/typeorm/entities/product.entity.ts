import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { ProductAsset } from './product-asset.entity';
import { ProductCategory } from './product-category.entity';
import { Review } from './review.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  code?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salePrice?: number | null;

  @Column({ type: 'int' })
  stockQuantity: number;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', name || ' ' || COALESCE(code, ''))",
    select: false,
    nullable: true,
  })
  @Index('product_search_vector_idx', { synchronize: false })
  searchVector: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategories: ProductCategory[];

  @OneToMany(() => ProductAsset, (productAsset) => productAsset.product)
  productAssets: ProductAsset[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
