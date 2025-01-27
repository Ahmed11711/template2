import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,OneToMany
} from 'typeorm';
import {UserPermission} from './user_permission'

@Entity()
export class Departments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.department)
userPermissions: UserPermission[];
}
