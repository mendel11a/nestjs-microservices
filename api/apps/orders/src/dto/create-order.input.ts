import {
  IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate,
  ValidateNested
} from "class-validator";
import { Types } from "mongoose";

export class CreateOrderInput {

  @IsString()
  user: string;

  @IsString()
  payment: string;

  @ValidateNested({ each: true })
  products: [{
    id: Types.ObjectId,
    quantity: number
  }];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsBoolean()
  isPaid: boolean;

  @IsBoolean()
  isDelivered: boolean;

}
