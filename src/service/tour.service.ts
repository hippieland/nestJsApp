import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourModel } from '../model/tour.model';

@Injectable()
export class TourService {
  constructor(@InjectModel(Tour.name) private readonly tourModel: Model<Tour>) {}

  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }

  async findOneById(id: string): Promise<Tour | null> {
    return this.tourModel.findById(id).exec();
  }

  async create(tour: Tour): Promise<Tour> {
    const newTour = new this.tourModel(tour);
    return newTour.save();
  }

  async update(id: string, tour: Tour): Promise<Tour | null> {
    return this.tourModel.findByIdAndUpdate(id, tour, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.tourModel.findByIdAndDelete(id).exec();
  }
}
