import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
//import { ToursModule } from './tours/tours.module';
//import { ReservationsModule } from './reservations/reservations.module';
//import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserModule/*, ToursModule, ReservationsModule, PaymentsModule*/],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
