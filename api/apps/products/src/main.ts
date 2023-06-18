import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PRODUCTS'));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  console.log(`🚀 Products service running on port ${configService.get('PORT')}`);
}
bootstrap();
