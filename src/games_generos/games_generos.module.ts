import { Module } from '@nestjs/common';
import { GamesGenerosService } from './games_generos.service';
import { GamesGenerosController } from './games_generos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    CaslModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GamesGenerosController],
  providers: [GamesGenerosService],
})
export class GamesGenerosModule {}
