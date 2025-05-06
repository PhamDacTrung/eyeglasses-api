import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Asset } from './asset.entity';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductAsset extends BaseEntity {
  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'uuid' })
  assetId: string;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
