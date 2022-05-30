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
    summary: 'Visualizar um genero pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.generosService.findById(id);
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
    summary: 'Editar um genero pelo ID',
  })
  update(@Param('id') id: string, @Body() updateGenerosDto: UpdateGeneroDto) {
    return this.generosService.update(id, updateGenerosDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um genero pelo ID',
  })
  delete(@Param('id') id: string) {
    this.generosService.delete(id);
  }
}
