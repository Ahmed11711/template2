import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EUserStatus } from '../enum/status.enum';
import { UserPermission } from '../../roleAndPermission/entity/user_permission';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ default: null })
  token?: string;

  @Column({ default: null })
  fcm_token?: string;

  @Column({ type: 'double', default: 0 })
  money: number;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'enum', enum: EUserStatus })
  type: EUserStatus;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions: UserPermission[];
}
