import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getHello(): { name: string; version: string } {
    return {
      name: 'TodoList API',
      version: '1.0.0',
    };
  }

  getHealth(): { status: string; db: string } {
    const dbState =
      this.connection.readyState === 1 ? 'connected' : 'disconnected';
    return {
      status: 'UP',
      db: dbState,
    };
  }
}
