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
import { CreateGamesDto } from './dto/create-game.dto';
import { UpdateGamesDto } from './dto/update-game.dto';
import { GamesService } from './games.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Games } from './entities/games.entity';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos games',
  })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar o game selecionado',
  })
  findOne(@Param('id') id: string): Promise<Games> {
    return this.gamesService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo game',
  })
  create(@Body() createGamesDto: CreateGamesDto) {
    return this.gamesService.create(createGamesDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar o game selecionado',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGamesDto): Promise<Games> {
    return this.gamesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover o game selecionado',
  })
  delete(@Param('id') id: string) {
    this.gamesService.delete(id);
  }
}
