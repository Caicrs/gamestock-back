import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroService {
  async delete(id: string) {
    await this.prisma.generos.delete({ where: { id } });
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genero[]> {
    return this.prisma.generos.findMany();
  }

  findOne(id: string): Promise<Genero> {
    return this.prisma.generos.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateGeneroDto): Promise<Genero> {
    const data: Genero = { ...dto };

    return this.prisma.generos.update({
      where: { id },
      data,
    });
  }

  create(dto: CreateGeneroDto): Promise<Genero> {
    const data: Genero = { ...dto };

    return this.prisma.generos.create({ data });
  }
}
