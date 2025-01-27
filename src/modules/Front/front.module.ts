import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantDatabaseService } from 'src/MultiTenant/tenant-database/tenant-database.service';
import { createTenantRepositoryProvider } from 'src/MultiTenant/provider/createTenantRepositoryProvider';
import { FrontEntity } from './entity/front.entity';
import { FrontController } from './controller/front.controller';
import { FrontService } from './service/fron.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([FrontEntity])],
  controllers: [FrontController],
  providers: [
    
    FrontService,
    TenantDatabaseService,
    createTenantRepositoryProvider(FrontEntity),   
  ],
  // exports: [FrontService, TenantDatabaseService, 'FRONT_REPOSITORY'],  
})
export class FrontModule {}



// for create new Module check if you want export or not if not fast run create Module