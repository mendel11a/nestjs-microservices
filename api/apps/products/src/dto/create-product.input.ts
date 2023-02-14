import { IsNotEmpty, IsNumber, IsString,IsBoolean } from "class-validator";

export class CreateProductInput {
  
  @IsString()
  user: string;

  @IsString()
  payment: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsBoolean()
  isPaid: boolean;

  @IsBoolean()
  isDelivered: boolean;
}
