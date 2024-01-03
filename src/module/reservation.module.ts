import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from '../controller/reservation.controller';
import { ReservationService } from '../service/reservation.service';
import { UserModule } from 'src/module/user.module';
import { TourModule } from './tour.module';
import { Reservation, ReservationModel } from '../model/reservation.model';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [ConfigModule,
    MongooseModule.forRootAsync(databaseConfig), 
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationModel }]),
    UserModule, TourModule],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule {}
