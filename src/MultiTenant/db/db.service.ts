import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Domin } from './entity/domin.entity';

@Injectable()
export class dbService {
  constructor(
    @InjectRepository(Domin)
    private readonly dbRepo: Repository<Domin>,
    private dataSource: DataSource,
  ) {}

  async getData(name: string) {
    const db = await this.dbRepo.findOneBy({ name });
    return db;
  }

  // إنشاء الدومين و قاعدة البيانات
  async createDomin(name: string) {
    const newDomin = this.dbRepo.create({
      name: name,
      host: '193.203.184.200',  // عنوان الـ host
      port: 3306,
      username: 'u374546222_ahmedsamir1911',
      password: 'Ahmed141516141516',
      database: `test_${name}`,
    });

    // حفظ الدومين
    const storenewdomin = await this.dbRepo.save(newDomin);
    await this.createDatabase(`test_${name}`);

    return {
      message: 'Database and Domin created successfully',
    };
  }

  // إنشاء قاعدة البيانات ومنح صلاحيات
  async createDatabase(dbName: string): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // تنفيذ استعلام SQL لإنشاء قاعدة البيانات إذا لم تكن موجودة
      await queryRunner.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbName}\``,
      );
      console.log(`Database ${dbName} created successfully.`);

      // منح صلاحية CREATE للمستخدم على جميع قواعد البيانات
      await queryRunner.query(`
        GRANT CREATE ON *.* TO 'ahmedsamir191197@gmail.com'@'%';
      `);
      console.log(`Permissions granted to user for creating databases.`);
      
    } catch (error) {
      console.error(`Error creating database or granting permissions for ${dbName}:`, error);
      throw new Error(`Error creating database or granting permissions for ${dbName}: ${error.message}`);
    } finally {
      // إغلاق الاتصال بعد العملية
      await queryRunner.release();
    }
  }
}
