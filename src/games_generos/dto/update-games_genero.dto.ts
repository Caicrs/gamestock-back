import { PartialType } from '@nestjs/swagger';
import { CreateGamesGeneroDto } from './create-games_genero.dto';

export class UpdateGamesGeneroDto extends PartialType(CreateGamesGeneroDto) {
  GamesId?: string;
}
