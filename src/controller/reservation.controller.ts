import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Reservation } from '../model/reservation.model';
import { ReservationService } from '../service/reservation.service';

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

    @Put(':id')
    update(@Param('id') id: string, @Body() reservation: Reservation): Promise<Reservation | null> {
        return this.reservationService.update(id, reservation);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.reservationService.delete(id);
    }

    @Post()
    async createReservation(
    @Body('userId') userId: string,
    @Body('tourId') tourId: string,
    @Body('pax') pax: number,
    @Body('totalPrice') totalPrice: number,
    @Body('date') date: string,
    ): Promise<Reservation> {
    const reservation = await this.reservationService.createReservation(userId, tourId, pax, totalPrice, date);

    // Envía un correo electrónico de confirmación
    await this.reservationService.sendReservationConfirmation(reservation);

    return reservation;
    }
}
