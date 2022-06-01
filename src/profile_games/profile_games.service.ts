import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileGameDto } from './dto/create-profile_game.dto';
import { UpdateProfileGameDto } from './dto/update-profile_game.dto';

@Injectable()
export class ProfileGamesService {
  async remove(id: string) {
    await this.findById(id);

    await this.prisma.profileGames.delete({ where: { id } });
  }
  async update(id: string, updateProfileGamesDto: UpdateProfileGameDto) {
    await this.findById(id);
    const data: Prisma.ProfileGamesUpdateInput = {
      ...updateProfileGamesDto,
      Profile: { connect: { id: updateProfileGamesDto.Profile } },
      Games: { connect: { id: updateProfileGamesDto.Games } },
    };

    return this.prisma.profileGames.update({
      where: { id },
      data,
    });
  }
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileGameDto: CreateProfileGameDto) {
    const data: Prisma.ProfileGamesCreateInput = {
      Profile: { connect: { id: createProfileGameDto.Profile } },
      Games: { connect: { id: createProfileGameDto.Games } },
    };

    return this.prisma.profileGames
      .create({
        data,
        select: {
          id: true,
          Profile: true,
          Games: true,
        },
      })
      .catch(this.handleError);
  }

  findAll() {
    return this.prisma.profileGames.findMany({
      select: {
        id: true,
        Profile: true,
        Games: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.profileGames.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    const record = await this.prisma.profileGames.findUnique({
      where: { id },
      select: {
        id: true,
        Profile: true,
        Games: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
