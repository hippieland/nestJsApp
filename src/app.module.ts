import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TourModule } from './tours/tour.module';
import { ReservationModule } from './reservations/reservation.module';
import { PaymentModule } from './payments/payment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, TourModule, ReservationModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
