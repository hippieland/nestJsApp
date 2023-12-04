import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  tourId: string;

  @Prop({ required: true, unique: true })
  pax: number;

  @Prop({ required: true, unique: true })
  totalPrice: number;

  @Prop({ required: true })
  date: string;

}

export const ReservationModel = SchemaFactory.createForClass(Reservation);
