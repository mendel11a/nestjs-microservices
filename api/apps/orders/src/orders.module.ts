import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';
import { OrdersController } from './orders.controller';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { PRODUCTS_SERVICE } from './constants/services';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    validationSchema: Joi?.object({
      RABBIT_MQ_URI: Joi.string().required(),
      RABBIT_MQ_PRODUCTS_QUEUE: Joi.string().required(),
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
    envFilePath: './apps/orders/.env',
  }),
  DatabaseModule,
  MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  RmqModule.register({
    name: PRODUCTS_SERVICE
  })],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule { }
