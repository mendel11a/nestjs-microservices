import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './users/dto/new-user.input';
import { LoginUserInput } from './users/dto/login-user.input';
import { User } from './users/schema/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserInput: CreateUserInput): Promise<User> {
    const password = createUserInput.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = this.usersRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser).catch((err) => {
      throw new InternalServerErrorException();
    });
    return newUser;
  }

  async login(
    loginUserInput: LoginUserInput,
  ): Promise<{ access_token: String }> {
    const user = await this.usersService.findOne(loginUserInput.email);
    console.log(user.id);

    const isCorrect = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    if (!isCorrect) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const payload = { sub: user.id, username: user.name };
    const jwt = await this.jwtService.signAsync(payload);

    // return {
    //   access_token: ,
    // };
    // const newUser = this.usersRepository.create({
    //   ...loginUserInput,
    //   password: hashedPassword,
    // });
    // await this.usersRepository.save(newUser).catch((err) => {
    //   throw new InternalServerErrorException();
    // });
    return {
      access_token: jwt,
    };
  }
}
