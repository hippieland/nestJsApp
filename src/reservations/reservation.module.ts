import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationModel } from './reservation.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig, getDatabaseConfig } from 'src/config/database.config';

@Module({
  imports: [ConfigModule,
    MongooseModule.forRootAsync(databaseConfig), 
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationModel }])],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
