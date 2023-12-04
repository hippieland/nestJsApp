import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { Tour, TourModel } from './tour.model';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from 'src/config/database.config';

@Module({
  imports: [ConfigModule,
    MongooseModule.forRootAsync(databaseConfig), 
    MongooseModule.forFeature([{ name: Tour.name, schema: TourModel }])],
  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}
