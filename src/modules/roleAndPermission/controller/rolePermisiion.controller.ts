import { Body, Controller, Post, Put } from '@nestjs/common';
import { RolePermissionDto } from '../dto/rolePermission.dto';
import { RolePermissionService } from '../service/rolePermission.service';

@Controller('Role')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post('assign')
  assignPermission(@Body() rolePermission: RolePermissionDto) {
    return this.rolePermissionService.createRole(rolePermission);
  }

  @Put('update_assign')
  updatenPermission(@Body() rolePermission: RolePermissionDto) {
    return this.rolePermissionService.updateRole(rolePermission);
  }

  @Post('permisssionForUser')
 async permissionForOne(@Body() user){
 
  
    return await this.rolePermissionService.getOneUserPermissions(user.user_id)
  }
}
