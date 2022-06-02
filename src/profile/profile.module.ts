import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    CaslModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
