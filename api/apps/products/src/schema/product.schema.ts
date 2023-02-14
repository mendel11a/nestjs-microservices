import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product extends AbstractDocument {
  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true, default:0 })
  price: number;

  @Prop({ required: true, default:0 })
  countInStock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);