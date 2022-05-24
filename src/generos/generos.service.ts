import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroService {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.generos.delete({ where: { id } });
  }

  findAll(): Promise<Genero[]> {
    return this.prisma.generos.findMany();
  }

  async findById(id: string): Promise<Genero> {
    const record = await this.prisma.generos.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Genero> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGeneroDto): Promise<Genero> {
    await this.findById(id);

    const data: Partial<Genero> = { ...dto };

    return this.prisma.generos.update({
      where: { id },
      data,
    });
  }

  create(dto: CreateGeneroDto): Promise<Genero> {
    const data: Genero = { ...dto };

    return this.prisma.generos.create({ data }).catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
