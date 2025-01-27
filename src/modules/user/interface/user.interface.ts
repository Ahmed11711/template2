import { EUserStatus } from '../enum/status.enum';
import { UserPermission } from '../../roleAndPermission/entity/user_permission';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  token?: string | null;
  fcm_token?: string | null;
  money: number;
  email_verified: boolean;
  is_active: boolean;
  type: EUserStatus;
  userPermissions: UserPermission[];
}
