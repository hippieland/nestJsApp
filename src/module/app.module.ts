import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { UserModule } from './user.module';
import { TourModule } from './tour.module';
import { AuthModule } from './auth.module';
import { ReservationModule } from './reservation.module';
import { PaymentModule } from './payment.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from '../config/google.strategy';
import { ReservationDetailsMiddleware } from 'src/middleware/reservationDetailsMiddleware';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, TourModule, ReservationModule, PaymentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReservationDetailsMiddleware).forRoutes('/reservations/:reservationId/details');
  }
}
