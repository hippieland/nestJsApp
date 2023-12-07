import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourController } from '../controller/tour.controller';
import { TourService } from '../service/tour.service';
import { Tour, TourModel } from '../model/tour.model';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [ConfigModule,
    MongooseModule.forRootAsync(databaseConfig), 
    MongooseModule.forFeature([{ name: Tour.name, schema: TourModel }])],
  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}
