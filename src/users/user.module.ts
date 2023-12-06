import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserModel } from './user.model';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [ConfigModule,
    MongooseModule.forRootAsync(databaseConfig), 
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
