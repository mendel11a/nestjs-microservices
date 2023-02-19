import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductInput {

  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  countInStock: number;
}
