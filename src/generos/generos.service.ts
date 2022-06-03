import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Injectable()
export class GeneroService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.generos.delete({ where: { id } });
  }

  async update(id: string, dto: UpdateGeneroDto) {
    await this.findById(id);

    const data: Prisma.GenerosUpdateInput = { ...dto };

    return this.prisma.generos.update({
      where: { id },
      data,
    });
  }

  constructor(private readonly prisma: PrismaService) {}

  private generosSelect = {
    id: true,
    Name: true,
  };

  async findById(id: string) {
    const record = await this.prisma.generos.findUnique({
      where: { id },
      select: this.generosSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  findAll() {
    return this.prisma.generos.findMany({
      select: this.generosSelect,
    });
  }

  create(createGeneroDto: CreateGeneroDto) {
    const data: Prisma.GenerosCreateInput = {
      Name: createGeneroDto.Name,
    };

    return this.prisma.generos
      .create({
        data,
        select: {
          id: true,
          Name: true,
        },
      })
      .catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
