import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';
import { dbService } from '../db/db.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private tenantDatabaseService: TenantDatabaseService,
    private dbService: dbService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    
    let tenantId = '';
    const host = req.headers.referer;
    if(host)
    {
      const cleanHost = host.replace(/^https?:\/\//, '');
         tenantId = cleanHost.split('.')[0];
    }else{
      const host = req.hostname;
        tenantId = host.split('.')[0];
    }
 
    
    // const cleanHost = host.replace(/^https?:\/\//, '');
    // // Now split on the first dot to get the tenantId
    // const tenantId = cleanHost.split('.')[0];
    
    req['tenantConnection'] = tenantId;
    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
    }
 
    const check = await this.dbService.getData(tenantId);

    try {
       

      req['tenantConnection'] = await this.tenantDatabaseService.getConnection({
        name: check.database,
        host: check.host,
        port: check.port, // Ensure this exists in your check object
        username: check.username,
        password: check.password,
        database: check.database,
      });
      // console.log(req['tenantConnection']);
      
      next();
    } catch (error) {
      console.error('Error details:', error);  
  return res.status(500).send(`Error connecting to tenant database: ${error.message}`);
      return res.status(500).send('Error connecting to tenant database');
    }
  }
}
