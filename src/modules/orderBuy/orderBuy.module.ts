import { Module } from "@nestjs/common";
import { OrderBuyController } from "./controller/orderBuyController";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderBuy } from "./entity/orderBuy.entity";
import { OrderBuyService } from "./service/orderBuy.service";
import { TenantDatabaseService } from "src/MultiTenant/tenant-database/tenant-database.service";
import { createTenantRepositoryProvider } from "src/MultiTenant/provider/createTenantRepositoryProvider";

@Module({
    imports:[TypeOrmModule.forFeature([OrderBuy])],
    controllers:[OrderBuyController],
    providers:[
        OrderBuyService,
        TenantDatabaseService,
        createTenantRepositoryProvider(OrderBuy)
    ],
      exports: [OrderBuyService],  

})

export class orderBuyModule {}

// must name of service == name entity  
// for example if named is ORDERBUY_REPOSITORY first step must be same name in entity
// so @inject('ORDERBUY_REPOSITORY') == name of entity=orderBuy 