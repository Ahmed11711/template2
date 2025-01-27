import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolePermissionController } from './controller/rolePermisiion.controller';
import { RolePermissionService } from './service/rolePermission.service';
import { UserService } from '../user/service/user.service';
import { UserModule } from '../user/user.module';
import { Departments } from './entity/Departments';
import { TenantDatabaseService } from 'src/MultiTenant/tenant-database/tenant-database.service';
import { createTenantRepositoryProvider } from 'src/MultiTenant/provider/createTenantRepositoryProvider';
import { UserPermission } from './entity/user_permission';

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission]), UserModule],
  controllers: [RolePermissionController],
  providers: [
    RolePermissionService,
    UserService,
    TenantDatabaseService,
    createTenantRepositoryProvider(UserPermission),
  ],
  exports: [
    RolePermissionService,
    TenantDatabaseService,
    'USERPERMISSION_REPOSITORY',
  ],
})
export class RolePermissionModule {}
