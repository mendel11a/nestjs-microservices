import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { ProductsModule } from './products.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PRODUCTS'));
  console.log(rmqService.getOptions('PRODUCTS'));
  await app.startAllMicroservices();
}
bootstrap();
