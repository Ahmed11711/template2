import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('front')
export class FrontEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?:string;


  @Column('json')
  content?: any;
}
