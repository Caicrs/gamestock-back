import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // < NOVO IMPORT

@Module({
  imports: [PrismaModule], // < NOVO IMPORT
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
