import { EnumUserRole } from '@common/enums';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserInfo } from './user-info.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar')
  password: string;

  @Column('enum', { enum: EnumUserRole, default: EnumUserRole.USER })
  role: EnumUserRole;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { nullable: true })
  phone?: string;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', email || ' ' || COALESCE(phone, ''))",
    select: false,
    nullable: true,
  })
  @Index('user_search_vector_idx', { synchronize: false })
  search_vector: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo: UserInfo;
}
