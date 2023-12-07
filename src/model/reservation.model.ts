import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true, unique: false  })
  userId: string;

  @Prop({ required: true , unique: false  })
  tourId: string;

  @Prop({ required: true, unique: false })
  pax: number;

  @Prop({ required: true, unique: false })
  totalPrice: number;

  @Prop({ required: true, unique: false  })
  date: string;

}

export const ReservationModel = SchemaFactory.createForClass(Reservation);
