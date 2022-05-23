import { Module } from '@nestjs/common';
import { GeneroController } from './generos.controller';
import { GeneroService } from './generos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GeneroController],
  providers: [GeneroService],
})
export class GeneroModule {}
