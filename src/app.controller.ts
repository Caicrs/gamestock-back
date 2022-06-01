import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppStatus(): string {
    return this.appService.getAppStatus();
  }

  @Get()
  @ApiOperation({
    summary: 'Visualizar Homepage',
  })
  @Get()
  findAll() {
    return this.appService.findAll();
  }
}
