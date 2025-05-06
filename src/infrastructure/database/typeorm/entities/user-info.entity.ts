import { EnumUserGender } from '@common/enums';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class UserInfo extends BaseEntity {
  @Column('uuid', { unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.userInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'time with time zone', nullable: true })
  dateOfBirth?: Date;

  @Column('varchar', { length: 20, nullable: true })
  gender?: EnumUserGender;

  @Column('varchar', { length: 100, nullable: true })
  profession?: string;

  @Column('varchar', { length: 100, nullable: true })
  style?: string;
}
