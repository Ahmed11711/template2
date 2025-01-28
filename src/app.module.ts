import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantMiddleware } from './MultiTenant/tenant/tenant.middleware';
import { dbService } from './MultiTenant/db/db.service';
import { DBModule } from './MultiTenant/db/db.module';
import { Domin } from './MultiTenant/db/entity/domin.entity';
import { TenantDatabaseService } from './MultiTenant/tenant-database/tenant-database.service';
import { User } from './modules/user/entity/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolePermissionModule } from './modules/roleAndPermission/rolePermission.module';
import { UserPermission } from './modules/roleAndPermission/entity/user_permission';
import { Departments } from './modules/roleAndPermission/entity/Departments';
import { Permission } from './modules/roleAndPermission/entity/permission';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { PermissionsGuard } from './Helper/Permission/guards/permission.guard';
import { APP_GUARD } from '@nestjs/core';
import { FrontModule } from './modules/Front/front.module';
import { FrontEntity } from './modules/Front/entity/front.entity';
import { orderBuyModule } from './modules/orderBuy/orderBuy.module';
import { OrderBuy } from './modules/orderBuy/entity/orderBuy.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'moshamadefulte',
      entities: [Domin, User, UserPermission, Departments, Permission,FrontEntity, ],
      synchronize: true,
    }),
    DBModule,
    UserModule,
    AuthModule,
    RolePermissionModule,
    FrontModule,
    orderBuyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TenantDatabaseService,
    dbService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
