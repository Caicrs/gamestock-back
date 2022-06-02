import { Module } from '@nestjs/common';
import { ProfileGamesService } from './profile_games.service';
import { ProfileGamesController } from './profile_games.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    CaslModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProfileGamesController],
  providers: [ProfileGamesService],
})
export class ProfileGamesModule {}
