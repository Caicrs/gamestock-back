/*
import { IsNumber, IsPositive } from 'class-validator';
*/
import { ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

export class CreateGeneroDto {
  @ApiProperty({
    description: 'O game criado',
    example: {
      Name: 'Genero aqui',
    },
  })
  Name: string;
  gameId?: string[];
}
