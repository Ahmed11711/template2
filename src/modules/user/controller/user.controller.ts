import { Body, Controller, Post, Request,Get,Param,ParseIntPipe, Put } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreatUserDto } from '../dto/create-user-dto';
import { UserService } from '../service/user.service';
import { UpdateUserDto } from '../dto/update-user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  create(@Body() createUser: CreatUserDto) {
       return this.userService.create(createUser);
  }

  @Get('all')
  getAll(){
    return this.userService.getAll();
  }

  @Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.userService.getOneById(id);
}

@Put(':id')
async update(@Param('id', ParseIntPipe) id: number,@Body() data:UpdateUserDto) {
  // return this.userService.update(id,data);
}
}
