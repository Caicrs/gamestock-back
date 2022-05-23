import { Injectable } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-game.dto';
import { Games } from './entities/games.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamesService {
  tables: Games[] = [];
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Games[]> {
    return this.prisma.games.findMany();
  }

  findOne(id: string): Promise<Games> {
    return this.prisma.games.findUnique({ where: { id } });
  }

  create(dto: CreateGamesDto): Promise<Games> {
    const data: Games = { ...dto };

    return this.prisma.games.create({ data });
  }
}
