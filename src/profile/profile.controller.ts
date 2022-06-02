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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { Action } from 'src/casl/enum';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo perfil | APENAS ADMINS',
  })
  create(@Body() createProfileDto: CreateProfileDto, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Visualizar todos os perfis | APENAS ADMINS',
  })
  findAll(@LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID | APENAS ADMINS',
  })
  findOne(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil pelo ID | APENAS ADMINS',
  })
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @LoggedUser() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um perfil pelo ID | APENAS ADMINS',
  })
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Apenas ADMINS');
    }
    return this.profileService.remove(id);
  }
}
