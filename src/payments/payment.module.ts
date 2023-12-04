import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment, PaymentModel } from './payment.model';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from 'src/config/database.config';

@Module({
  imports: [ConfigModule,
    MongooseModule.forRootAsync(databaseConfig), 
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentModel }])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
