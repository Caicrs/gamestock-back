import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário. Apenas para exibição',
    example: 'Paulo Salvatore',
  })
  Name: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abcd@1234',
  })
  Password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsUrl()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'example@gmail.com',
  })
  Email: string;

  @IsString()
  @ApiProperty({
    description: 'Cpf do usuário',
    example: '032.156.627-10',
  })
  Cpf: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Admin',
    example: 'false',
  })
  IsAdmin?: boolean;
  ProfileGames?: string[];
}
