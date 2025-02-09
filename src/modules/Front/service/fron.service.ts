import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FrontEntity } from '../entity/front.entity';

@Injectable()
export class FrontService {
  constructor(
    @Inject('FRONTENTITY_REPOSITORY')  
    private readonly frontRepository: Repository<FrontEntity>,  ) {}

  async saveNavbarSettings(name: string, content: any) {
    const newFront = this.frontRepository.create({
      name: name,
      content: content,
    });

    return await this.frontRepository.save(newFront);
  }

  async getAllFront(){
   
    return await this.frontRepository.find();
  }

  async updateNavbarSettings(data,id) {
    const front = await this.frontRepository.findOne({ where: { id } });
  
    if (!front) {
      throw new Error('Navbar setting not found');
    }
  
    front.name = data.name;
    front.content = data.content;
  
    return await this.frontRepository.save(front);
  }
}
