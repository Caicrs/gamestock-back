/*
import { IsNumber, IsPositive } from 'class-validator';
*/
import { ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

export class CreateGamesDto {
  @ApiProperty({
    description: 'O game criado',
    example: {
      Title: 'Gta V',
      CoverImageUrl: 'https://image_url',
      Description: 'Descrição aqui',
      Year: 2010,
      ImdbScore: 5,
      TrailerYouTubeUrl: 'YOUTUBE_URL',
      GameplayYouTubeUrl: 'YOUTUBE_URL',
    },
  })
  Title: string;
  CoverImageUrl: string;
  Description: string;
  Year: number;
  ImdbScore: number;
  TrailerYouTubeUrl: string;
  GameplayYouTubeUrl: string;
}
