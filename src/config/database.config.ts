
// src/database.config.ts

import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

export const getDatabaseConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
  uri: configService.get<string>('MONGODB_URI'),
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

export const databaseConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => await getDatabaseConfig(configService),
  inject: [ConfigService],
};



/*
import { ConfigService } from '@nestjs/config';

export const databaseConfig = async (configService: ConfigService) => ({
  uri: configService.get<string>('mongodb+srv://ssanchezola:EpJSgRVqBXJK9teO@hipisoft.mtvfboq.mongodb.net/?retryWrites=true&w=majority'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/