import { Injectable } from '@nestjs/common';
import { createConnection, Connection, getConnectionManager } from 'typeorm';
import { Domin } from '../db/entity/domin.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Departments } from 'src/modules/roleAndPermission/entity/Departments';
import { Permission } from 'src/modules/roleAndPermission/entity/permission';
import { UserPermission } from 'src/modules/roleAndPermission/entity/user_permission';
import { FrontEntity } from 'src/modules/Front/entity/front.entity';
import { OrderBuy } from 'src/modules/orderBuy/entity/orderBuy.entity';

@Injectable()
export class TenantDatabaseService {
  private connections: Map<string, Connection> = new Map();

  async getConnection(tenantId): Promise<Connection> {
    const { name, host, port, username, password, database } = tenantId;
 

    // Check if the connection already exists
    const connectionManager = getConnectionManager();

    if (connectionManager.has(name)) {
      const existingConnection = connectionManager.get(name);

      // If the connection is not connected, reconnect
      if (!existingConnection.isConnected) {
        // console.log(`Reconnecting to existing connection: ${name}`);
        await existingConnection.connect();
      } else {
        console.log(`Reusing active connection: ${name}`);
      }

      return existingConnection;
    }

    // console.log(`Creating new connection: ${name}`);
// console.log(tenantId);

    const connection = await createConnection({
      name: name,
      type: 'mysql',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      entities: [Domin, User, UserPermission, Departments, Permission,FrontEntity],
      synchronize: true,
      extra: {
        connectionLimit: 100,
      },
    });
 
 
    return connection;
  }
}
