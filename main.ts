import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/insfrasctructure/module/app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: false, 
    whitelist: true, 
    forbidNonWhitelisted: true, 
  }));

  await app.listen(3000);
}
bootstrap();
