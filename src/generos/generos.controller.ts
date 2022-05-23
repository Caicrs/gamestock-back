import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { GeneroService } from './generos.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Genero } from './entities/genero.entity';

@ApiTags('generos')
@Controller('generos')
export class GeneroController {
  constructor(private generosService: GeneroService) {}

  @Get()
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma mesa',
  })
  findOne(@Param('id') id: string): Promise<Genero> {
    return this.generosService.findOne(id);
  }

  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.create(createGeneroDto);
  }

  @Delete()
  delete() {
    return 'deletado!';
  }
}
