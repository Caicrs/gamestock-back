import { Module } from '@nestjs/common';
import { GamesGenerosService } from './games_generos.service';
import { GamesGenerosController } from './games_generos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GamesGenerosController],
  providers: [GamesGenerosService],
})
export class GamesGenerosModule {}
