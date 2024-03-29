import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesGeneroDto } from './dto/create-games_genero.dto';
import { UpdateGamesGeneroDto } from './dto/update-games_genero.dto';

@Injectable()
export class GamesGenerosService {
  create(createGamesGeneroDto: CreateGamesGeneroDto) {
    const data: Prisma.GamesGenerosCreateInput = {
      Games: { connect: { id: createGamesGeneroDto.GamesId } },
      Generos: { connect: { id: createGamesGeneroDto.GenerosId } },
    };

    return this.prisma.gamesGeneros
      .create({
        data,
        select: {
          id: true,
          Games: { select: { Title: true } },
          Generos: { select: { Name: true } },
        },
      })
      .catch(this.handleError);
  }
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.gamesGeneros.findMany({
      select: {
        id: true,
        Games: { select: { Title: true } },
        Generos: { select: { Name: true } },
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.gamesGeneros.findUnique({
      where: { id },
      select: {
        id: true,
        GamesId: true,
        Games: { select: { Title: true } },
        GenerosId: true,
        Generos: { select: { Name: true } },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findById(id: string) {
    const record = await this.prisma.gamesGeneros.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async update(id: string, updateGamesGeneroDto: UpdateGamesGeneroDto) {
    await this.findById(id);
    const data: Prisma.GamesGenerosUncheckedUpdateInput = {
      ...updateGamesGeneroDto,
      GamesId: updateGamesGeneroDto.GamesId,
      GenerosId: updateGamesGeneroDto.GenerosId,
    };

    return this.prisma.gamesGeneros.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findById(id);

    await this.prisma.gamesGeneros.delete({ where: { id } });
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
