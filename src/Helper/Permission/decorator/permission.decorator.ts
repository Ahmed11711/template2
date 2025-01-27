import { SetMetadata } from '@nestjs/common';
import { EPermission } from '../enum/permission.enum';

export const PERMISSION_KEY = 'permissions';
export const SetPermissions = (...permissions: EPermission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
