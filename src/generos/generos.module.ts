import { Module } from '@nestjs/common';
import { GeneroController } from './generos.controller';
import { GeneroService } from './generos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    CaslModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GeneroController],
  providers: [GeneroService],
})
export class GeneroModule {}
