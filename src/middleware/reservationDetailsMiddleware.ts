// reservation-details.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/service/user.service';
import { TourService } from 'src/service/tour.service';
import { ReservationService } from 'src/service/reservation.service';

@Injectable()
export class ReservationDetailsMiddleware implements NestMiddleware {
  constructor(private userService: UserService, 
    private tourService: TourService,
    private reservationService: ReservationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const reservationId = req.params.reservationId; 

    console.log('Middleware executed for reservationId:', reservationId);

    try {
      // Fetch reservation details from your database or service
      const reservation = await this.getReservationDetails(reservationId);

      // Fetch user details
      const user = await this.userService.findOneById(reservation.userId);

      // Fetch tour details
      const tour = await this.tourService.findOneById(reservation.tourId);

      // Attach the user and tour details to the request object
      //req['userDetails'] = user;
      //req['tourDetails'] = tour;
      res.locals.reservationDetails = { reservation, user, tour };
      console.log('Reservation Details:', res.locals.reservationDetails);

      next();
    } catch (error) {
      res.status(404).json({ message: 'Reservation not found' });
    }
  }

  private async getReservationDetails(reservationId: string) {
    const reservationDetails = await this.reservationService.findOneById(reservationId);
    return reservationDetails;
  }
}
