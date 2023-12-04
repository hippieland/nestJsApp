import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true, unique: false })
  reservationId: string;

  @Prop({ required: true, unique: false })
  paymentMethod: string;

  @Prop({ required: true, unique: true })
  totalPaid: string;
}

export const PaymentModel = SchemaFactory.createForClass(Payment);
