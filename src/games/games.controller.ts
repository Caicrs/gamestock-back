import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateGamesDto } from './dto/create-game.dto';
import { UpdateGamesDto } from './dto/update-game.dto';
import { GamesService } from './games.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Games } from './entities/games.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { User } from '@prisma/client';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/enum';

@ApiTags('games')
@UseGuards(AuthGuard())
@UseGuards(RolesGuard)
@ApiBearerAuth()
@Controller('games')
export class GamesController {
  constructor(
    private gamesService: GamesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos games ',
  })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar o game selecionado | APENAS ADMINS',
  })
  findOne(@Param('id') id: string, @LoggedUser() user: User): Promise<Games> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo game | APENAS ADMINS',
  })
  create(@Body() createGamesDto: CreateGamesDto, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesService.create(createGamesDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar o game selecionado | APENAS ADMINS',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGamesDto,
    @LoggedUser() user: User,
  ): Promise<Games> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.gamesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover o game selecionado | APENAS ADMINS',
  })
  delete(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    this.gamesService.delete(id);
  }
}
