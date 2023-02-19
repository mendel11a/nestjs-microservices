import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  payment: string;

  @Prop({ required: true })
  products: [{
    id: string,
    quantity: number
  }];

  @Prop({ required: true, default: 0 })
  totalPrice: number;

  @Prop({ required: true, default: false })
  isPaid: boolean;

  @Prop({ required: true, default: false })
  isDelivered: boolean;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
