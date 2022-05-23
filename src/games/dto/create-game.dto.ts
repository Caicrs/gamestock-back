/*
import { IsNumber, IsPositive } from 'class-validator';
*/
import { ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

export class CreateGamesDto {
  @ApiProperty({
    description: 'O game criado',
    example: {
      titulo: 'Gta V',
      preco: 200,
      plataforma: 'Playstation 5',
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
