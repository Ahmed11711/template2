import { Controller, Get } from "@nestjs/common";
import { OrderBuyService } from "../service/orderBuy.service";

@Controller('t')
export class OrderBuyController{

    constructor(
        private readonly orderBuyService:OrderBuyService
    ){}

    @Get()
    text(){
        return this.orderBuyService.text();
    }
}