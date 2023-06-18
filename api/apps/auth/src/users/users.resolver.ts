import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './schema/user.entity';
import { CreateUserInput } from './dto/new-user.input';
import { LoginUserInput } from './dto/login-user.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.usersService.findAll().catch((err) => {
      throw err;
    });
  }
  
  @Query(() => User)
  async getUser(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return await this.usersService.findOne(email).catch((err) => {
      throw err;
    });
  }

  // @Mutation(() => User)
  // async createUser(
  //   @Args('createUserInput') createUserInput: CreateUserInput,
  // ): Promise<User> {
  //   return await this.usersService.register(createUserInput).catch((err) => {
  //     throw err;
  //   });
  // }

  // @Mutation(() => User)
  // async loginUser(
  //   @Args('loginUserInput') loginUserInput:LoginUserInput
  // ): Promise<User> {
  //   return await this.usersService.login(loginUserInput).catch((err) => {
  //     throw err;
  //   });
  // }
}
