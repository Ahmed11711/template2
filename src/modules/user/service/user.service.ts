import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TenantDatabaseService } from '../../../MultiTenant/tenant-database/tenant-database.service';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepo: Repository<User>,
    
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(createUser) {
    const existingUser = await this.getEmail(createUser.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const newUser = this.userRepo.create({
      ...createUser,
      password: await this.hashPassword(createUser.password),
    });

    const savedUser = await this.userRepo.save(newUser);

    return {
      message: 'User created successfully',
      data: savedUser,
    };
  }

  ////////////////////////////////////////////HELPERS/////////////////////////////////////////////////////////////

  async getEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async verfiedUserById(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async getAll():Promise<IUser[]|null>{
    return this.userRepo.find();
  }
  async getOneById(id:number):Promise<IUser|null>{
    return await this.userRepo.findOneBy({ id });
  }
  
}