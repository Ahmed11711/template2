import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Domin {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  database: string;
}
