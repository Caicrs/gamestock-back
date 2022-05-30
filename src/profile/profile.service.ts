import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      Title: createProfileDto.Title,
      ImageUrl: createProfileDto.ImageUrl,
      User: { connect: { id: createProfileDto.UserId } },
    };

    return this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          Title: true,
          ImageUrl: true,
          UserId: true,
          ProfileGames: true,
        },
      })
      .catch(this.handleError);
  }

  findAll() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        Title: true,
        ImageUrl: true,
        UserId: true,
        ProfileGames: true,
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        Title: true,
        ImageUrl: true,
        User: true,
        ProfileGames: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async update(id: string, dto: UpdateProfileDto) {
    await this.findById(id);

    const data: Prisma.ProfileUpdateManyMutationInput = {
      ...dto,
      Title: dto.Title,
      ImageUrl: dto.ImageUrl,
    };

    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findById(id);

    await this.prisma.profile.delete({ where: { id } });
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
