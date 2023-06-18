import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail,IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlpha()
  @Field( type=>String)
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field( { defaultValue:false })
  isAdmin: boolean;
}
