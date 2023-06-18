import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './users/schema/user.entity'; 
import { CreateUserInput } from './users/dto/new-user.input'; 
import { LoginUserInput } from './users/dto/login-user.input'; 
import { AuthService } from './auth.service';
import { LoggedUserOutput } from './users/dto/logged-user.output';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.authService.register(createUserInput).catch((err) => {
      throw err;
    });
  }

  @Mutation(()=>LoggedUserOutput)
  async loginUser(
    @Args('loginUserInput') loginUserInput:LoginUserInput
  ):Promise<{ access_token:String }> {
    return await this.authService.login(loginUserInput).catch((err) => {
      throw err;
    });
  }
}
