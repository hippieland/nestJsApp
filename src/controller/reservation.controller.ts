import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { Reservation } from '../model/reservation.model';
import { ReservationService } from '../service/reservation.service';
import { ReservationDetailsMiddleware } from 'src/middleware/reservationDetailsMiddleware';

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

    @Get('/:reservationId/details')
    getReservationDetails(@Param('reservationId') reservationId: string, @Res() res) {
      const { reservation, user, tour } = res.locals.reservationDetails;
  
      if (!reservation || !user || !tour) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      return res.status(200).json({
        message: 'Reservation details fetched successfully',
        reservation,
        user,
        tour,
      });
    }
}
