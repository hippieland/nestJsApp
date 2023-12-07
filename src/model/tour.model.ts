import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tour extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: false })
  price: number;

  @Prop({ required: false, unique: false })
  category: string;

  @Prop({ required: true, unique: false })
  description: string;

  @Prop({ required: true, unique: false })
  level: string;

  @Prop({ required: true, unique: false })
  meals: string;

  @Prop({ required: false, unique: false })
  transport: string;

  @Prop({ required: false, unique: false })
  hosting: string;

  @Prop({ required: true, unique: false })
  groupSize: string;

  @Prop({ required: false, unique: false })
  image: string;

}

export const TourModel = SchemaFactory.createForClass(Tour);
