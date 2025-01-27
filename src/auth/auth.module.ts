import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserService } from 'src/modules/user/service/user.service';
import { UserModule } from 'src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtContstants/jwt.constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolePermissionService } from 'src/modules/roleAndPermission/service/rolePermission.service';
import { RolePermissionModule } from 'src/modules/roleAndPermission/rolePermission.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    RolePermissionModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, RolePermissionService],
  exports: [AuthService],
})
export class AuthModule {}
