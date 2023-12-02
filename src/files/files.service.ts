import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './image.model';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Image.name) private readonly imageModel: Model<Image>) {}

  async uploadFile(file: Express.Multer.File, description: string): Promise<string> {
    const fileName = `${new Date().getTime()}-${file.originalname}`;
    const filePath = `./uploads/${fileName}`;

    // Guardar la imagen en el sistema de archivos
    fs.writeFileSync(filePath, file.buffer);

    // Guardar la información de la imagen en MongoDB
    const newImage = new this.imageModel({
      filename: fileName,
      description: description,
      path: filePath,
      // Agrega más propiedades según sea necesario
    });

    const savedImage = await newImage.save();
    
    // Retorna el ID de la imagen guardada o cualquier otra información necesaria
    return savedImage.id;
  }
}
