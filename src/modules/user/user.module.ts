import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TenantDatabaseService } from 'src/MultiTenant/tenant-database/tenant-database.service';
import { createTenantRepositoryProvider } from 'src/MultiTenant/provider/createTenantRepositoryProvider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    TenantDatabaseService,
    createTenantRepositoryProvider(User),
  ],
  exports: [UserService, TenantDatabaseService, 'USER_REPOSITORY'], // Export USER_REPOSITORY
})
export class UserModule {}
