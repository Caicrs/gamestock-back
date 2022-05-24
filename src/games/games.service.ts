import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-game.dto';
import { Games } from './entities/games.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGamesDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.games.delete({ where: { id } });
  }

  tables: Games[] = [];
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Games[]> {
    return this.prisma.games.findMany();
  }

  async findById(id: string): Promise<Games> {
    const record = await this.prisma.games.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Games> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGamesDto): Promise<Games> {
    await this.findById(id);

    const data: Partial<Games> = { ...dto };

    return this.prisma.games.update({
      where: { id },
      data,
    });
  }

  create(dto: CreateGamesDto): Promise<Games> {
    const data: Games = { ...dto };

    return this.prisma.games.create({ data }).catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
