import { Module } from '@nestjs/common';
import { ProfileGamesService } from './profile_games.service';
import { ProfileGamesController } from './profile_games.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileGamesController],
  providers: [ProfileGamesService],
})
export class ProfileGamesModule {}
