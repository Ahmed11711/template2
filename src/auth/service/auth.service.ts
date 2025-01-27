import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RolePermissionService } from 'src/modules/roleAndPermission/service/rolePermission.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly rolePermission: RolePermissionService,
  ) {}

  async validatedUser(email: string, password: string) {
    const user = await this.userService.getEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(userLogin) {
    const user = await this.validatedUser(userLogin.email, userLogin.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const permission = await this.getPermission(user.id);

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.type,
      permissions: permission,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      message: 'create Login',
      data: access_token,
    };
  }

  async getPermission(user_id: number): Promise<string[]> {
    const userPermissions =
      await this.rolePermission.getOneUserPermissions(user_id);

    // Map over the permissions to format them as "departmentName_permissionType"
    const formattedPermissions = userPermissions.map((permission) => {
      return `${permission.department.name}_${permission.permission.type}`;
    });

    return formattedPermissions;
  }
}
