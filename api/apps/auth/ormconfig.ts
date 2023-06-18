import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/users/schema/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions  =
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "mendel11",
    "database": "mystore",
    "entities": [User],
    "synchronize": true,
}

export default typeOrmConfig;