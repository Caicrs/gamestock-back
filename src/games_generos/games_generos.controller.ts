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
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { GamesGenerosService } from './games_generos.service';
import { CreateGamesGeneroDto } from './dto/create-games_genero.dto';
import { UpdateGamesGeneroDto } from './dto/update-games_genero.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { User } from '@prisma/client';
import { Action } from 'src/casl/enum';

@ApiTags('gamesGeneros')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('games-generos')
export class GamesGenerosController {
  constructor(
    private readonly gamesGenerosService: GamesGenerosService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas relações GAMES X GENERO | APENAS ADMINS',
  })
  findAll(@LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesGenerosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma relação pelo ID | APENAS ADMINS',
  })
  findOne(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesGenerosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar uma relação pelo ID | APENAS ADMINS',
  })
  update(
    @Param('id') id: string,
    @Body() updateGamesGeneroDto: UpdateGamesGeneroDto,
    @LoggedUser() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesGenerosService.update(id, updateGamesGeneroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma relação pelo ID | APENAS ADMINS',
  })
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesGenerosService.remove(id);
  }
}
