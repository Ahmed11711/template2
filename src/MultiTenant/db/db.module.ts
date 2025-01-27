import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbService } from './db.service';
import { Domin } from './entity/domin.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Domin])],
  providers: [dbService],
  exports: [dbService, TypeOrmModule],
})
export class DBModule {}
