import { ApiProperty } from '@nestjs/swagger';

export class CreateGamesGeneroDto {
  @ApiProperty({
    description: 'A relação criada',
    example: {
      GenerosId: 'ID de um genero VÁLIDO !',
      GamesId: 'ID de um game VÁLIDO !',
    },
  })
  GenerosId?: string[];
  GamesId: string[];
}
