import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({origin: 'http://localhost:3300'})
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(3000);
}
bootstrap();
