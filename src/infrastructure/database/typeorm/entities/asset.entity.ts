import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Asset extends BaseEntity {
  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  name: string;
}
