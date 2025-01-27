import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Permission } from './permission';
import { Departments } from './Departments';

@Entity('user_permission')
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userPermissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Permission, (permission) => permission.userPermissions)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @ManyToOne(() => Departments, (department) => department.userPermissions)
  @JoinColumn({ name: 'department_id' })
  department: Departments;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
