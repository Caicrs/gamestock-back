import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-game.dto';
import { Games } from './entities/games.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGamesDto } from './dto/update-game.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  async delete(id: string) {
    await this.findById(id);
    await this.prisma.games.delete({ where: { id } });
  }

  constructor(private readonly prisma: PrismaService) {}

  private gamesSelect = {
    id: true,
    Title: true,
    CoverImageUrl: true,
    Description: true,
    Year: true,
    ImdbScore: true,
    TrailerYouTubeUrl: true,
    GameplayYouTubeUrl: true,
    ProfileGames: true,
    GamesGeneros: true,
  };

  findAll() {
    return this.prisma.games.findMany({
      select: this.gamesSelect,
    });
  }

  async findById(id: string) {
    const record = await this.prisma.games.findUnique({
      where: { id },
      select: this.gamesSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async update(id: string, dto: UpdateGamesDto) {
    await this.findById(id);

    const data: Prisma.GamesUpdateInput = { ...dto };

    return this.prisma.games.update({
      where: { id },
      data,
    });
  }

  create(dto: CreateGamesDto) {
    const data: Prisma.GamesCreateInput = {
      ...dto,
      Title: dto.Title,
      CoverImageUrl: dto.CoverImageUrl,
      Description: dto.Description,
      Year: dto.Year,
      ImdbScore: dto.ImdbScore,
      TrailerYouTubeUrl: dto.TrailerYouTubeUrl,
      GameplayYouTubeUrl: dto.GameplayYouTubeUrl,
    };

    return this.prisma.games
      .create({ data, select: this.gamesSelect })
      .catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
