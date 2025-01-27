import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Domin } from './entity/domin.entity';
@Injectable()
export class dbService {
  constructor(
    @InjectRepository(Domin)
    private readonly dbRepo: Repository<Domin>,
  ) {}

  async getData(name: string) {
    const db = await this.dbRepo.findOneBy({ name });
 

    return db;
  }
}
