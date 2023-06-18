import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import ormconfig from  '../../ormconfig'

@Module({
  imports:[TypeOrmModule.forRoot(ormconfig)],
  exports:[TypeOrmModule]  
})
export class DatabaseModule{
    constructor(){
        console.log("DB connected successfully!");
    }
}