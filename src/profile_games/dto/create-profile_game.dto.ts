import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileGameDto {
  @ApiProperty({
    description: 'A relação criada',
    example: {
      GenerosId: 'ID de um genero VÁLIDO !',
      GamesId: 'ID de um game VÁLIDO !',
    },
  })
  Profile?: string[];
  Games?: string[];
}
