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
import { ProfileGamesService } from './profile_games.service';
import { CreateProfileGameDto } from './dto/create-profile_game.dto';
import { UpdateProfileGameDto } from './dto/update-profile_game.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { Action } from 'src/casl/enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@ApiTags('profile-games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile-games')
export class ProfileGamesController {
  constructor(
    private readonly profileGamesService: ProfileGamesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar relação entre GAMES X PROFILES ',
  })
  create(@Body() createProfileGameDto: CreateProfileGameDto) {
    return this.profileGamesService.create(createProfileGameDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Visualizar todas as relações GAMES X PROFILES | APENAS ADMINS ',
  })
  @Get()
  findAll(@LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.profileGamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma relação pelo ID ',
  })
  findOne(@Param('id') id: string) {
    return this.profileGamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar uma relação pelo ID ',
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
    summary: 'Remover uma relação pelo ID ',
  })
  remove(@Param('id') id: string) {
    return this.profileGamesService.remove(id);
  }
}
