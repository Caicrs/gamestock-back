import { Injectable } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-game.dto';
import { Games } from './entities/games.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGamesDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  async delete(id: string) {
    await this.prisma.games.delete({ where: { id } });
  }

  update(id: string, dto: UpdateGamesDto): Promise<Games> {
    const data: Games = { ...dto };

    return this.prisma.games.update({
      where: { id },
      data,
    });
  }

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
