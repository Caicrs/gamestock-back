import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'O game criado',
    example: {
      Title: 'Perfil 1',
      ImageUrl: 'Image_url,',
      UserId: 'ID de usuario válido',
    },
  })
  Title: string;
  ImageUrl: string;
  UserId: string;
  ProfileGames?: string[];
}
