import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check https://gamestock-api.herokuapp.com/api for Swagger docs...';
  }
}
