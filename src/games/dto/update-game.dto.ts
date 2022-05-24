import { PartialType } from '@nestjs/mapped-types';

import { CreateGamesDto } from './create-game.dto';

export class UpdateGamesDto extends PartialType(CreateGamesDto) {
  Title: string;
  CoverImageUrl: string;
  Description: string;
  Year: number;
  ImdbScore: number;
  TrailerYouTubeUrl: string;
  GameplayYouTubeUrl: string;
}
