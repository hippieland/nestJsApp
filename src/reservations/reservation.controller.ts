import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Reservation } from './reservation.model';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Get()
    findAll(): Promise<Reservation[]> {
        return this.reservationService.findAll();
    } 

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Reservation | null> {
        return this.reservationService.findOneById(id);
    }

    @Post()
    create(@Body() reservation: Reservation): Promise<Reservation> {
        return this.reservationService.create(reservation);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() reservation: Reservation): Promise<Reservation | null> {
        return this.reservationService.update(id, reservation);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.reservationService.delete(id);
    }
}
