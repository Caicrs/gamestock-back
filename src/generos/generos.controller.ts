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
import { CreateGeneroDto } from './dto/create-genero.dto';
import { GeneroService } from './generos.service';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { User } from '@prisma/client';
import { Action } from 'src/casl/enum';

@ApiTags('generos')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('generos')
export class GeneroController {
  constructor(
    private generosService: GeneroService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos os generos | APENAS ADMINS',
  })
  findAll(@LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um genero pelo ID | APENAS ADMINS',
  })
  findOne(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.generosService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar novo genero | APENAS ADMINS',
  })
  create(@Body() createGeneroDto: CreateGeneroDto, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.generosService.create(createGeneroDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um genero pelo ID | APENAS ADMINS',
  })
  update(
    @Param('id') id: string,
    @Body() updateGenerosDto: UpdateGeneroDto,
    @LoggedUser() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.generosService.update(id, updateGenerosDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um genero pelo ID | APENAS ADMINS',
  })
  delete(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    this.generosService.delete(id);
  }
}
