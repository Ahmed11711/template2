import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { Repository } from 'typeorm';
import { UserPermission } from '../entity/user_permission';
import { Departments } from '../entity/Departments';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject('USERPERMISSION_REPOSITORY')
    private readonly userRepo: Repository<UserPermission>,

    private readonly userService: UserService,
  ) {}

  async createRole(rolePermission) {
    const checkUser = await this.checkUserById(rolePermission.user_id);

    for (const permissionId of rolePermission.permission) {
      await this.assignPermissionToUser(
        rolePermission.user_id,
        rolePermission.department,
        permissionId,
      );
    }
    return {
      message: 'create SuccessFull',
    };
  }

  async updateRole(rolePermission) {
    const checkUser = await this.checkUserById(rolePermission.user_id);
    await this.userRepo.delete({
      user: { id: rolePermission.user_id },
      department: { id: rolePermission.department },
    });

    // Reassign new permissions
    for (const permissionId of rolePermission.permission) {
      await this.assignPermissionToUser(
        rolePermission.user_id,
        rolePermission.department,
        permissionId,
      );
    }
    return {
      message: 'update SuccessFull',
    };
  }

  async getOneUserPermissions(user_id: number): Promise<UserPermission[] | []> {
    const userPermissions = await this.userRepo.find({
      where: { user: { id: user_id } }, // Find by user_id
      relations: ['department', 'permission'],
    });

    return userPermissions;
  }

  async checkUserById(id: number) {
    const check = await this.userService.verfiedUserById(id);
    if (!check) {
      throw new HttpException(
        'User with the given ID is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return check;
  }

  async assignPermissionToUser(
    userId: number,
    departmentId: number,
    permissionId: number,
  ) {
    const existingPermission = await this.userRepo.findOne({
      where: {
        user: { id: userId },
        department: { id: departmentId },
        permission: { id: permissionId },
      },
    });

    if (existingPermission) {
      return;
    }

    const userPermission = this.userRepo.create({
      user: { id: userId },
      department: { id: departmentId },
      permission: { id: permissionId },
    });

    await this.userRepo.save(userPermission);
  }
}
