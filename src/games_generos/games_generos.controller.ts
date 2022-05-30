import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GamesGenerosService } from './games_generos.service';
import { CreateGamesGeneroDto } from './dto/create-games_genero.dto';
import { UpdateGamesGeneroDto } from './dto/update-games_genero.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('gamesGeneros')
@Controller('games-generos')
export class GamesGenerosController {
  constructor(private readonly gamesGenerosService: GamesGenerosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas relações GAMES X GENERO',
  })
  findAll() {
    return this.gamesGenerosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma relação pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.gamesGenerosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar uma relação pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateGamesGeneroDto: UpdateGamesGeneroDto,
  ) {
    return this.gamesGenerosService.update(id, updateGamesGeneroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma relação pelo ID',
  })
  remove(@Param('id') id: string) {
    return this.gamesGenerosService.remove(id);
  }
}
