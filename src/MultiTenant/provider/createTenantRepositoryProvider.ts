import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';

export function createTenantRepositoryProvider(entity: Function): Provider {
   
  return {
    provide: `${entity.name.toUpperCase()}_REPOSITORY`,
    useFactory: async (
      request: Request,
      tenantDatabaseService: TenantDatabaseService,
    ): Promise<Repository<any>> => {
      
      const tenantConnection = request['tenantConnection'];

      if (!tenantConnection) {
        throw new Error('Tenant connection is required');
      }
      
      

      return tenantConnection.getRepository(entity);
    },
    inject: [REQUEST, TenantDatabaseService],
  };
  
}
