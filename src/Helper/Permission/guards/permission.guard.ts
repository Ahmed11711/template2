import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EPermission } from '../enum/permission.enum';
import { PERMISSION_KEY } from '../decorator/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<EPermission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true; // If no permissions are set, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.permissions) {
      return false;
    }

    // Check if the user has the required permissions
    return requiredPermissions.some((permission) =>
      user.permissions.includes(permission),
    );
  }
}
