import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { userDtoLogin } from '../dto/login.dto';
import { GetCurrentUser } from '../decorator/get-current-user';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { PermissionsGuard } from 'src/Helper/Permission/guards/permission.guard';
import { SetPermissions } from 'src/Helper/Permission/decorator/permission.decorator';
import { EPermission } from 'src/Helper/Permission/enum/permission.enum';
import { IsPublic } from '../decorator/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServcie: AuthService) {}

  @Post('login')
  @IsPublic()
  login(@Body() userLogin: userDtoLogin) {
    return this.authServcie.login(userLogin);
  }

  @Post('profile')
  @SetPermissions(EPermission.USER_CREATE)
  read(@GetCurrentUser() user) {
    return user;
  }
}
