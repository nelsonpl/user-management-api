import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { name: string; version: string } {
    return { 
      name: 'TodoList API', 
      version: '1.0.0' 
    }
  }
}
