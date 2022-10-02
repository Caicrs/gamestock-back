import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    cors:true,
  });
  app.enableCors();
   // Para conseguir pegar o protocolo https
   app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Gamestock')
    .setDescription('Aplicação para gestão de games ')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('homepage')
    .addTag('games')
    .addTag('generos')
    .addTag('user')
    .addTag('profile')
    .addTag('gamesGeneros')
    .addTag('profile-games')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
