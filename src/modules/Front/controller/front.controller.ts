import { IsPublic } from 'src/auth/decorator/isPublic.decorator';
import { FrontService } from './../service/fron.service';
import { Body, Controller, Get, Post,Param ,Put} from "@nestjs/common";

@Controller('front')

export class FrontController{

    constructor(
        private readonly frontService:FrontService
    ){}

    @Post('create')
   async Create(@Body()data){
     
   return this.frontService.saveNavbarSettings(data.name,data.content);
    }

    @IsPublic()
    @Get('get')
    async getAll(@Body()data){
      
    return this.frontService.getAllFront();
     }

     
     @Put('update/:id')
     async updateFront(@Body() data,@Param('id') id: number,)
     {
        return this.frontService.updateNavbarSettings(data,id)
     }
}