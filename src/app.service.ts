import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check http://localhost:3333/api for Swagger docs...';
  }
}
