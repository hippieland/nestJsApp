// src/files/image.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop()
  description: string;

  @Prop()
  path: string;

  // Agrega más propiedades según sea necesario
}

export const ImageSchema = SchemaFactory.createForClass(Image);
