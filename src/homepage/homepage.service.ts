import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: {
        Profiles: {
          select: {
            Title: true,
            ProfileGames: {
              select: {
                Games: {
                  select: {
                    Title: true,
                    GamesGeneros: {
                      select: { Generos: { select: { Name: true } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const allGames = await this.prisma.games.findMany({
      select: {
        id: true,
        Title: true,
        CoverImageUrl: true,
        Description: true,
        Year: true,
        ImdbScore: true,
        TrailerYouTubeUrl: true,
        GameplayYouTubeUrl: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return [record, allGames];
  }
}
