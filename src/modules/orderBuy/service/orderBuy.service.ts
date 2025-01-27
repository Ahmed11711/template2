import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OrderBuy } from "../entity/orderBuy.entity";

@Injectable()
export class OrderBuyService{

    constructor(
        @Inject('ORDERBUY_REPOSITORY')
        private readonly orderBuyRepository:Repository<OrderBuy>
        
    ){}
    // OrderBuy


    text(){
        return 555;
    }
}