import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
//   import { CreateUserInput } from './dto/new-user.input';
//   import { LoginUserInput } from './dto/login-user.input';
  import { User } from './schema/user.entity';
//   import * as bcrypt from 'bcrypt';
//   import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

//   async register(createUserInput: CreateUserInput): Promise<User> {
//     const password = createUserInput.password;
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = this.usersRepository.create({
//       ...createUserInput,
//       password: hashedPassword,
//     });
//     await this.usersRepository.save(newUser).catch((err) => {
//       throw new InternalServerErrorException();
//     });
//     return newUser;
//   }

//   async login(loginUserInput: LoginUserInput): Promise<User> {
//     const user = await this.findOne(loginUserInput.email);
    
//     const isCorrect = await bcrypt.compare(loginUserInput.password, user.password);

//     if (!isCorrect) {
//       throw new UnauthorizedException('Wrong Credentials');
//     }

//     const payload = { sub: user.id, username: user.name };
//     const jwt = await this.jwtService.signAsync(payload)
//     // return {
//     //   access_token: ,
//     // };
//     // const newUser = this.usersRepository.create({
//     //   ...loginUserInput,
//     //   password: hashedPassword,
//     // });
//     // await this.usersRepository.save(newUser).catch((err) => {
//     //   throw new InternalServerErrorException();
//     // });
//     return user;
//   }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find().catch((err) => {
      throw new InternalServerErrorException();
    });
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException({ message: 'User not found' });
    return user;
  }
}
