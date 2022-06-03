import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileGameDto {
  @ApiProperty({
    description: 'A relação criada',
    example: {
      Profile: 'ID de um profile VÁLIDO !',
      Games: 'ID de um game VÁLIDO !',
    },
  })
  Profile?: string;
  Games?: string;
}
