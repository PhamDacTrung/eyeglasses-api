import { Expose } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IdentityEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;
}

export abstract class BaseEntity extends IdentityEntity {
  @CreateDateColumn({ type: 'time with time zone' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    select: false,
    type: 'time with time zone',
  })
  deletedAt?: Date | null;
}

export abstract class BaseEntityWithoutId {
  @CreateDateColumn({ type: 'time with time zone' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    select: false,
    type: 'time with time zone',
  })
  deletedAt?: Date | null;
}
