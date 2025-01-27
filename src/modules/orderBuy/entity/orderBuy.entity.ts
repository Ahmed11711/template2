import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TemplateType } from "../enum/templateType.enum";


@Entity('orderBuy')
export class OrderBuy{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"smallint"})
    frameId:number;

    @Column({ type: 'varchar', length: 255 })
    websiteUrl: string;

    @Column({type:'enum',enum:TemplateType,default:TemplateType.Both})
    templateType:TemplateType
    
    @Column({type:'boolean',default:false})
    status:boolean // for if buying and paid active it

    @Column({nullable:true})
    expireDateForServer:Date

    @Column({nullable:true})
    expireForFree:Date

    @Column({
        type:'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt:Date


    @Column({
        type:'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updateAt:Date

}