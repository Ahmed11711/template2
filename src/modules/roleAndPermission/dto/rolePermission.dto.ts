import { IsNotEmpty, IsNumber, IsArray, IsEnum } from 'class-validator';
import { PermissionEnum } from '../enum/roleType.enum';
export class RolePermissionDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  department: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  @IsEnum(PermissionEnum, { each: true })
  permission: PermissionEnum[];
}
