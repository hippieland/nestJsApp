import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Tour } from '../model/tour.model';
import { TourService } from '../service/tour.service';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  findAll(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tour | null> {
    return this.tourService.findOneById(id);
  }

  @Post()
  create(@Body() tour: Tour): Promise<Tour> {
    return this.tourService.create(tour);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tour: Tour): Promise<Tour | null> {
    return this.tourService.update(id, tour);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tourService.delete(id);
  }
}
