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
import { ProfileGamesService } from './profile_games.service';
import { CreateProfileGameDto } from './dto/create-profile_game.dto';
import { UpdateProfileGameDto } from './dto/update-profile_game.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile-games')
@Controller('profile-games')
export class ProfileGamesController {
  constructor(private readonly profileGamesService: ProfileGamesService) {}

  @Post()
  create(@Body() createProfileGameDto: CreateProfileGameDto) {
    return this.profileGamesService.create(createProfileGameDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Visualizar todas as relações GAMES X PROFILES',
  })
  @Get()
  findAll() {
    return this.profileGamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma relação pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.profileGamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar uma relação pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateProfileGameDto: UpdateProfileGameDto,
  ) {
    return this.profileGamesService.update(id, updateProfileGameDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma relação pelo ID',
  })
  remove(@Param('id') id: string) {
    return this.profileGamesService.remove(id);
  }
}
