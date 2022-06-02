import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GeneroModule } from './generos/generos.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { GamesGenerosModule } from './games_generos/games_generos.module';
import { ProfileGamesModule } from './profile_games/profile_games.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    GamesModule,
    GeneroModule,
    PrismaModule,
    UserModule,
    ProfileModule,
    GamesGenerosModule,
    ProfileGamesModule,
    AuthModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
