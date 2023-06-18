import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import Joi from 'joi';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import {  RmqModule } from '@app/common';
import { UsersModule } from './users/users.module';
import { PRODUCTS_SERVICE } from './constants/services';
import { UsersService } from './users/users.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi?.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_PRODUCTS_QUEUE: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    RmqModule.register({
      name: PRODUCTS_SERVICE,
    }),
  ],
  providers: [AuthService, AuthResolver, UsersService],
})
export class AuthModule {}
