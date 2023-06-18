import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe()); // make input validation work properly
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  console.log(`🚀 Auth service running on port ${configService.get('PORT')}`);
}
bootstrap();
