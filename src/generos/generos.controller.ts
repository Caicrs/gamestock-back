import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { GeneroService } from './generos.service';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Genero } from './entities/genero.entity';

@ApiTags('generos')
@Controller('generos')
export class GeneroController {
  constructor(private generosService: GeneroService) {}

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos os generos',
  })
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar o genero selecionado',
  })
  findOne(@Param('id') id: string): Promise<Genero> {
    return this.generosService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar novo genero',
  })
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.create(createGeneroDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar o genero selecionado',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGeneroDto,
  ): Promise<Genero> {
    return this.generosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover o genero selecionado',
  })
  delete(@Param('id') id: string) {
    this.generosService.delete(id);
  }
}
