import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { Email, Password } = loginDto;

    // Procura e checa se o user existe, usando o nickname
    const user = await this.prisma.user.findUnique({ where: { Email } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    // Valida se a senha informada é corretaa
    const isHashValid = await bcrypt.compare(Password, user.Password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.Password;

    return {
      token: this.jwtService.sign({ Email }),
      user,
    };
  }
}
